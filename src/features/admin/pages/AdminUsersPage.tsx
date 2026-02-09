import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import CreateUserModal from "../components/CreateUserModal";
import EditUserModal from "../components/EditUserModal";
import { toast } from "sonner";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";

type User = {
  id: number;
  name: string;
  email: string;
  role: "customer" | "admin" | "superadmin";
  avatar?: string;
  creationAt: string;
  updatedAt: string;
};

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();

  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { data: users = [], refetch } = useQuery<User[]>({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axios.get("https://api.escuelajs.co/api/v1/users");
      return res.data;
    },
  });

  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const paginatedUsers = users.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  return (
    <div>
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

      <div className="border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Profile</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Created At</th>
              <th className="p-3">Updated At</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((u) => (
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
                <td className="p-3">
                  {new Date(u.creationAt).toLocaleDateString()}
                </td>

                <td className="p-3">
                  {new Date(u.updatedAt).toLocaleDateString()}
                </td>

                <td className="p-3 flex justify-end gap-2">
                  <button
                    onClick={() => setEditUser(u)}
                    className="p-2 rounded hover:bg-gray-100"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => setDeleteId(u.id)}
                    className="p-2 rounded hover:bg-red-50 text-red-600"
                  >
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
              className={`w-9 h-9 rounded-full text-sm
        ${page === i ? "bg-black text-white" : "border hover:bg-gray-100"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {open && (
        <CreateUserModal
          onClose={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false);
            refetch();
          }}
        />
      )}

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

      <DeleteConfirmDialog
        open={deleteId !== null}
        title="Delete User?"
        description="Are you sure you want to delete this User?"
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          const id = deleteId;
          if (!id) return;

          try {
            await axios.delete(`https://api.escuelajs.co/api/v1/users/${id}`);

            refetch();

            toast.success("User deleted successfully");
          } catch {
            toast.error("Demo API does not allow deleting this User");
          } finally {
            setDeleteId(null);
          }
        }}
      />
    </div>
  );
}
