import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/features/products/components/ProductCard";

export default function WishlistPage() {
  const {items} = useWishlist()

  if (!items.length)
    return <p className="text-center mt-10">No items in wishlist ❤️</p>;

  return (
    <div className="grid grid-cols-4 gap-6">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}