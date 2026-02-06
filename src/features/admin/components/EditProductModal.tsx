import { useState } from "react";
import axios from "axios";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
};

type Props = {
  product: Product;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditProductModal({
  product,
  onClose,
  onSuccess,
}: Props) {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(String(product.price));
  const [description, setDescription] = useState(product.description || "");
  const [image, setImage] = useState(product.images?.[0] || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    //  REQUIRED VALIDATION
    if (!title || !price || !description || !image) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await axios.put(
        `https://api.escuelajs.co/api/v1/products/${product.id}`,
        {
          title,
          price: Number(price),
          description,
          images: [image],
        }
      );

      onSuccess(); // refetch / invalidate
      onClose();
    } catch {
      setError("Update failed (public API limitation)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px] space-y-4">
        <h2 className="text-xl font-semibold">Edit Product</h2>

        {error && (
          <p className="text-red-600 text-sm bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        <input
          className="border p-2 w-full rounded"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <textarea
          className="border p-2 w-full rounded"
          placeholder="Description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
