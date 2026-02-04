import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function AdminUsersPage() {
  const currentUser = useAuthStore((s) => s.user);

  // 🔹 GET USERS
  const { data: users = [], refetch } = useQuery<User[]>({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axios.get(
        "https://api.escuelajs.co/api/v1/users"
      );
      return res.data;
    },
  });

  // 🔹 DELETE USER
  const deleteUser = async (id: number) => {
    await axios.delete(
      `https://api.escuelajs.co/api/v1/users/${id}`
    );
    refetch();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      <div className="space-y-4">
        {users.map((u) => (
          <div
            key={u.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{u.name}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
              <p className="text-xs text-gray-400">
                Role: {u.role}
              </p>
            </div>

            {/*  ADMIN / SUPERADMIN ONLY */}
            {(currentUser?.role === "admin" ||
              currentUser?.role === "superadmin") && (
              <Button
                variant="destructive"
                onClick={() => deleteUser(u.id)}
              >
                Delete
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}