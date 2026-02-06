import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

import CreateCategoryModal from "../components/CreateCategoryModal";
import EditCategoryModal from "../components/EditCategoryModal";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

type Category = {
  id: number;
  name: string;
  image: string;
};

export default function AdminCategoriesPage() {
  const currentUser = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const res = await axios.get(
        "https://api.escuelajs.co/api/v1/categories"
      );
      return res.data;
    },
  });

 
  const deleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(
        `https://api.escuelajs.co/api/v1/categories/${id}`
      );

      // instant UI update
      queryClient.setQueryData<Category[]>(
        ["admin-categories"],
        (old) => old?.filter((c) => c.id !== id)
      );
    } catch {
      alert("Delete failed (API limitation)");
    }
  };

  return (
    <div>
  
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Categories</h1>

        {(currentUser?.role === "admin" ||
          currentUser?.role === "superadmin") && (
          <button
            onClick={() => setOpen(true)}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Create Category
          </button>
        )}
      </div>

    
      <div className="border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={3} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            )}

            {categories.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">
                  <img
                    src={c.image}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>

                <td className="p-3 font-medium">{c.name}</td>

                <td className="p-3 flex justify-end gap-2">
                  <button
                    onClick={() => setEditCategory(c)}
                    className="p-2 rounded hover:bg-gray-100"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => deleteCategory(c.id)}
                    className="p-2 rounded hover:bg-red-50 text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      {open && (
        <CreateCategoryModal
          onClose={() => setOpen(false)}
          onSuccess={() =>
            queryClient.invalidateQueries({
              queryKey: ["admin-categories"],
            })
          }
        />
      )}

      {/* EDIT MODAL */}
      {editCategory && (
        <EditCategoryModal
          category={editCategory}
          onClose={() => setEditCategory(null)}
          onSuccess={() =>
            queryClient.invalidateQueries({
              queryKey: ["admin-categories"],
            })
          }
        />
      )}
    </div>
  );
}
