import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

import CreateCategoryModal from "../components/CreateCategoryModal";
import EditCategoryModal from "../components/EditCategoryModal";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";

type Category = {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

export default function AdminCategoriesPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const res = await axios.get("https://api.escuelajs.co/api/v1/categories");
      return res.data;
    },
  });

  

  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

  const paginatedCategories = categories.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  return (
    <div>
     
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Categories</h1>

        {(user?.role === "admin" || user?.role === "superadmin") && (
          <button
            onClick={() => setOpen(true)}
            className="bg-black text-white px-4 py-2 rounded">
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
              <th className="p-3">Created At</th>
              <th className="p-3">Updated At</th>

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

            {paginatedCategories.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">
                  <img
                    src={c.image}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>

                <td className="p-3 font-medium">{c.name}</td>
                <td className="p-3">
                  {new Date(c.creationAt).toLocaleDateString()}
                </td>

                <td className="p-3">
                  {new Date(c.updatedAt).toLocaleDateString()}
                </td>

                <td className="p-3 flex justify-end gap-2">
                  <button
                    onClick={() => setEditCategory(c)}
                    className="p-2 rounded hover:bg-gray-100">
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => setDeleteId(c.id)}
                    className="p-2 rounded hover:bg-red-50 text-red-600">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-9 h-9 rounded-full border text-sm ${
                page === i ? "bg-black text-white" : "hover:bg-gray-100"
              }`}>
              {i + 1}
            </button>
          ))}
        </div>
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
      <DeleteConfirmDialog
        open={deleteId !== null}
        title="Delete Category?"
        description="Are you sure you want to delete this Category?"
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          const id = deleteId;
          if (!id) return;

          try {
            await axios.delete(
              `https://api.escuelajs.co/api/v1/categories/${id}`,
            );

            queryClient.setQueryData<Category[]>(["admin-categories"], (old) =>
              old?.filter((p) => p.id !== id),
            );

            toast.success("Category deleted successfully");
          } catch {
            toast.error("Demo API does not allow deleting this Category");
          } finally {
            setDeleteId(null);
          }
        }}
      />
    </div>
  );
}
