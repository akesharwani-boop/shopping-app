import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

type Props = {
  category: {
    id: number;
    name: string;
  };
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditCategoryModal({
  category,
  onClose,
  onSuccess,
}: Props) {
  const [name, setName] = useState(category.name);
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

      await axios.put(
        `https://api.escuelajs.co/api/v1/categories/${category.id}`,
        { name }
      );

      onSuccess(); // invalidate query
      onClose();
    } catch {
      setError("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-bold mb-4">Edit Category</h2>

        {error && (
          <p className="text-red-600 text-sm mb-2">{error}</p>
        )}

        <input
          className="border p-2 w-full mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={submit} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
}
