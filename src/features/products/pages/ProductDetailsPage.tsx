import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../api/products.api";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { toast } from "sonner";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const addToCart = useCartStore((s) => s.addToCart);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productsApi.getProductById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="grid grid-cols-2 gap-10">
      {/* Image */}
      <img
        src={product.images?.[0] || "https://via.placeholder.com/400"}
        alt={product.title}
        className="rounded-lg w-full object-cover"
      />

      {/* Details */}
      <div>
        <h2 className="text-2xl font-bold">{product.title}</h2>

        <p className="text-gray-500 my-4">
          {product.description}
        </p>

        <p className="text-xl font-semibold mb-6">
          ${product.price}
        </p>

        <Button
          onClick={() => {
            addToCart(product); 
            toast.success("Added to cart 🛒");
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}