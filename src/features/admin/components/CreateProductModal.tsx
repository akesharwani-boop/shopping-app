import { useState } from "react";
import axios from "axios";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateProductModal({ onClose, onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    
    if (!title || !price || !categoryId || !image || !description) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await axios.post("https://api.escuelajs.co/api/v1/products", {
        title,
        price: Number(price),
        description,
        categoryId: Number(categoryId),
        images: [image],
      });

      onSuccess(); // 👈 parent ko signal
      onClose();
    } catch {
      setError("Failed to create product (public API limitation)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">Create Product</h2>

        {error && (
          <p className="text-red-600 text-sm bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        <input
          className="w-full border p-2 rounded"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Category ID (eg: 1)"
          type="number"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded"
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
            onClick={handleCreate}
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
