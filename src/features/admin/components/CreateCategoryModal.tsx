import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateCategoryModal({ onClose, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
   
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post("https://api.escuelajs.co/api/v1/categories", {
        name,
        image: "https://picsum.photos/200",
      });

      onSuccess(); 
      onClose();
    } catch {
      setError("Failed to create category (API error)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-bold mb-4">Create Category</h2>

        {error && (
          <p className="text-red-600 text-sm mb-2">{error}</p>
        )}

        <input
          placeholder="Category name"
          className="border p-2 w-full mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={submit} disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
}
