import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export default function AdminProductsPage() {
  const user = useAuthStore((s) => s.user);

  const { data: products = [], refetch } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const res = await axios.get("https://api.escuelajs.co/api/v1/products");
      return res.data;
    },
  });

  const deleteProduct = async (id: number) => {
    await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
    refetch();
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

      <div className="space-y-4">
        
        {products.map((p: any) => (
          <div
            key={p.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="text-sm text-gray-500">${p.price}</p>
            </div>

            {/*  ADMIN / SUPERADMIN ONLY */}
            {(user?.role === "admin" || user?.role === "superadmin") && (
              <div className="flex gap-2">
                <Button size="sm">Edit</Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteProduct(p.id)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
