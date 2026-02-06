import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import CreateUserModal from "../components/CreateUserModal";
import EditUserModal from "../components/EditUserModal";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
};

export default function AdminUsersPage() {
  const currentUser = useAuthStore((s) => s.user);

  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const {
    data: users = [],
    refetch,
  } = useQuery<User[]>({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axios.get(
        "https://api.escuelajs.co/api/v1/users"
      );
      return res.data;
    },
  });

  //  API unreliable → UX based delete
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `https://api.escuelajs.co/api/v1/users/${id}`
      );
    } catch  {
      alert("Delete simulated (Demo API limitation)");
    } finally {
      // UI refresh anyway
      refetch();
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Users</h1>

        {(currentUser?.role === "admin" ||
          currentUser?.role === "superadmin") && (
          <button
            onClick={() => setOpen(true)}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Create User
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Profile</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">
                  <img
                    src={u.avatar || "https://i.pravatar.cc/40"}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                </td>

                <td className="p-3 font-medium">{u.name}</td>
                <td className="p-3 text-gray-600">{u.email}</td>

                <td className="p-3">
                  <span className="px-2 py-1 text-xs rounded bg-gray-200">
                    {u.role}
                  </span>
                </td>

                <td className="p-3 flex justify-end gap-2">
                  {/* EDIT */}
                  <button
                    onClick={() => setEditUser(u)}
                    className="p-2 rounded hover:bg-gray-100 text-gray-600"
                  >
                    <Pencil size={16} />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(u.id)}
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

      {/* CREATE */}
      {open && (
        <CreateUserModal
          onClose={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false);
            refetch();
          }}
        />
      )}

      {/* EDIT */}
      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSuccess={() => {
            setEditUser(null);
            refetch();
          }}
        />
      )}
    </div>
  );
}
