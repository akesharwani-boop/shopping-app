import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

import CreateUserModal from "../components/CreateUserModal";
import EditUserModal from "../components/EditUserModal";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function AdminUsersPage() {
  const currentUser = useAuthStore((s) => s.user);

  //  modal states (INSIDE component)
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

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
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Users</h1>

        {/*  ADMIN / SUPERADMIN ONLY */}
        {(currentUser?.role === "admin" ||
          currentUser?.role === "superadmin") && (
          <Button onClick={() => setOpen(true)}>
            Create User
          </Button>
        )}
      </div>

      {/* USERS LIST */}
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
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => setEditUser(u)}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteUser(u.id)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/*  CREATE USER MODAL */}
      {open && (
        <CreateUserModal
          onClose={() => setOpen(false)}
          onSuccess={refetch}
        />
      )}

      {/* ✏️ EDIT USER MODAL */}
      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSuccess={refetch}
        />
      )}
    </div>
  );
}
