
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../api/products.api";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useState } from "react";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const {addToCart} = useCart()

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productsApi.getProductById(Number(id)),
    enabled: !!id,
  });

  // selected image
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  const mainImage = selectedImage || product.images[0];

  return (
    <div className="grid grid-cols-2 gap-10">
      
      {/* LEFT SIDE: IMAGES */}
      <div className="flex gap-4">
        
        {/* Thumbnails */}
        <div className="flex flex-col gap-3">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumbnail"
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 object-cover rounded cursor-pointer border
                ${
                  mainImage === img
                    ? "border-black"
                    : "border-gray-300"
                }`}
            />
          ))}
        </div>

        {/* Main Image */}
        <img
          src={mainImage}
          alt={product.title}
          className="w-full rounded-lg object-cover"
        />
      </div>

      {/* RIGHT SIDE: DETAILS */}
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