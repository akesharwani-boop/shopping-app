// import type { Product } from "../types/product.types";
// import { useNavigate } from "react-router-dom";

// export function ProductCard({ product }: { product: Product }) {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="border rounded p-3 cursor-pointer hover:shadow"
//       onClick={() => navigate(`/products/${product.id}`)}>
//       <img
//         src={product.images?.[0] || "https://via.placeholder.com/300"}
//         className="h-40 w-full object-cover rounded"
//       />
//       <h3 className="font-semibold mt-2">{product.title}</h3>
//       <p className="text-sm text-gray-500">${product.price}</p>
//     </div>
//   );
// }
import type { Product } from "../types/product.types";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { useWishlistStore } from "@/features/wishlist/store/useWishlistStore";
import { Heart } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const addToCart = useCartStore((s) => s.addToCart);

  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isWishlisted = useWishlistStore((s) =>
    s.isWishlisted(product.id)
  );

  return (
    <div className="border rounded-lg p-3 hover:shadow transition relative">

      {/* ❤️ Wishlist Icon */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 z-10"
      >
        <Heart
          size={22}
          className={
            isWishlisted
              ? "fill-red-500 text-red-500"
              : "text-gray-400"
          }
        />
      </button>

      <img
        src={product.images?.[0] || "https://via.placeholder.com/300"}
        className="h-40 w-full object-cover rounded cursor-pointer"
        onClick={() => navigate(`/products/${product.id}`)}
      />

      <h3 className="font-semibold mt-2">{product.title}</h3>
      <p className="text-sm text-gray-500">${product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Add To Cart
      </button>
    </div>
  );
}
