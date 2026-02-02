import type { Product } from "../types/product.types";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { useWishlistStore } from "@/features/wishlist/store/useWishlistStore";
import { Heart } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const addToCart = useCartStore((s) => s.addToCart);
  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart"); // ya /checkout agar hai
  };
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));

  return (
    <div className="border rounded-lg p-3 hover:shadow transition relative">
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 z-10"
      >
        <Heart
          size={22}
          className={
            isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
          }
        />
      </button>

      <img
        src={product.images?.[0] || "https://via.placeholder.com/300"}
        onError={(e) => {
          e.currentTarget.src =
            "https://via.placeholder.com/300x300?text=No+Image";
        }}
        className="h-40 w-full object-cover rounded cursor-pointer"
        onClick={() => navigate(`/products/${product.id}`)}
      />

      <h3 className="font-semibold mt-2">{product.title}</h3>
      <p className="text-sm text-gray-500">${product.price}</p>

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md text-sm font-semibold transition"
        >
          Buy Now
        </button>

        <button
          onClick={() => addToCart(product)}
          className="flex-1 border border-black hover:bg-black hover:text-white py-2 rounded-md text-sm font-semibold transition"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
