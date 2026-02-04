import type { Product } from "../types/product.types";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { useWishlistStore } from "@/features/wishlist/store/useWishlistStore";
import { Heart } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const addToCart = useCartStore((s) => s.addToCart);

  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));
  const user = useAuthStore((s) => s.user);

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="group border rounded-xl bg-white overflow-hidden hover:shadow-lg transition">
      <div
        className="relative h-48 bg-gray-100 cursor-pointer overflow-hidden"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img
          src={product.images?.[0] || "https://via.placeholder.com/300"}
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/300x300?text=No+Image";
          }}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow"
        >
          <Heart
            size={18}
            className={
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
            }
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold line-clamp-2 mb-1">
          {product.title}
        </h3>

        <p className="text-base font-bold mb-3">${product.price}</p>

        <div className="flex gap-2">
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md text-sm font-medium transition"
          >
            Buy Now
          </button>

          <button
            onClick={() => addToCart(product)}
            className="flex-1 border border-gray-300 hover:bg-black hover:text-white py-2 rounded-md text-sm font-medium transition"
          >
            Add To Cart
          </button>
          {/* 🔒 ADMIN / SUPERADMIN ONLY */}
          {(user?.role === "admin" || user?.role === "superadmin") && (
            <div className="flex gap-2 mt-3">
              <Button size="sm">Edit</Button>
              <Button size="sm" variant="destructive">
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
