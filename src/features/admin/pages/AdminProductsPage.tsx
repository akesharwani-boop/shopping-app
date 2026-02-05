import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import IconButton from "@/components/ui/IconButton";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  category?: {
    name: string;
  };
};

export default function AdminProductsPage() {
  const user = useAuthStore((s) => s.user);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const res = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      return res.data;
    },
  });

  const handleDelete = () => {
    alert("Delete API disabled (API returns 400)");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Manage Products
      </h1>

      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3">
                  <img
                    src={
                      p.images?.[0] ||
                      "https://via.placeholder.com/40"
                    }
                    className="w-10 h-10 rounded object-cover"
                  />
                </td>

                <td className="p-3 font-medium">
                  {p.title}
                </td>

                <td className="p-3">
                  ${p.price}
                </td>

                <td className="p-3">
                  {p.category?.name || "-"}
                </td>

                <td className="p-3">
                  {(user?.role === "admin" ||
                    user?.role === "superadmin") && (
                    <div className="flex justify-end gap-2">
                      <IconButton
                        onClick={() =>
                          console.log("edit", p.id)
                        }
                      >
                        <Pencil size={16} />
                      </IconButton>

                      <IconButton
                        color="red"
                        onClick={handleDelete}
                      >
                        <Trash size={16} />
                      </IconButton>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
