import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import CreateProductModal from "../components/CreateProductModal";
import EditProductModal from "../components/EditProductModal";

type Product = {
  id: number;
  title: string;
  price: number;
  category: { name: string };
  images: string[];
};

export default function AdminProductsPage() {
  const currentUser = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const res = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      return res.data;
    },
  });

  const deleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );

      // instant UI update
      queryClient.setQueryData<Product[]>(
        ["admin-products"],
        (old) => old?.filter((p) => p.id !== id)
      );
    } catch (err) {
      alert("Delete API failed (public API limitation)");
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>

        {(currentUser?.role === "admin" ||
          currentUser?.role === "superadmin") && (
          <button
            onClick={() => setOpen(true)}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Create Product
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
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

                <td className="p-3 flex justify-end gap-2">
                  <button
                    onClick={() => setEditProduct(p)}
                    className="p-2 rounded hover:bg-gray-100"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => deleteProduct(p.id)}
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
        <CreateProductModal
          onClose={() => setOpen(false)}
          onSuccess={() => queryClient.invalidateQueries({ queryKey: ["admin-products"] })}
        />
      )}

      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSuccess={() => queryClient.invalidateQueries({ queryKey: ["admin-products"] })}
        />
      )}
    </div>
  );
}
