import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import CreateProductModal from "../components/CreateProductModal";
import EditProductModal from "../components/EditProductModal";
import { toast } from "sonner";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
type AdminProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: { name: string };
  images: string[];
  creationAt: string;
  updatedAt: string;
};

export default function AdminProductsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<AdminProduct | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { data: products = [] } = useQuery<AdminProduct[]>({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const res = await axios.get("https://api.escuelajs.co/api/v1/products");
      return res.data;
    },
  });

  
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedProducts = products.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  return (
    <div>
     
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>

        {(user?.role === "admin" || user?.role === "superadmin") && (
          <button
            onClick={() => setOpen(true)}
            className="bg-black text-white px-4 py-2 rounded">
            Create Product
          </button>
        )}
      </div>

      <div className="border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Created At</th>
              <th className="p-3">Updated At</th>

              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedProducts.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">
                  <img
                    src={p.images?.[0]}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>

                <td className="p-3 font-medium">{p.title}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3">{p.category?.name}</td>
                <td className="p-3">
                  {new Date(p.creationAt).toLocaleDateString()}
                </td>

                <td className="p-3">
                  {new Date(p.updatedAt).toLocaleDateString()}
                </td>

                <td className="p-3 flex justify-end gap-2">
                  <button
                    onClick={() => setEditProduct(p)}
                    className="p-2 rounded hover:bg-gray-100">
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => setDeleteId(p.id)}
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
        <CreateProductModal
          onClose={() => setOpen(false)}
          onSuccess={() =>
            queryClient.invalidateQueries({
              queryKey: ["admin-products"],
            })
          }
        />
      )}

      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSuccess={() =>
            queryClient.invalidateQueries({
              queryKey: ["admin-products"],
            })
          }
        />
      )}
      <DeleteConfirmDialog
        open={deleteId !== null}
        title="Delete Product?"
        description="Are you sure you want to delete this product?"
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          const id = deleteId;
          if (!id) return;

          try {
            await axios.delete(
              `https://api.escuelajs.co/api/v1/products/${id}`,
            );

            queryClient.setQueryData<AdminProduct[]>(
              ["admin-products"],
              (old) => old?.filter((p) => p.id !== id),
            );

            toast.success("Product deleted successfully");
          } catch {
            toast.error("Demo API does not allow deleting this product");
          } finally {
            setDeleteId(null);
          }
        }}
      />
    </div>
  );
}
