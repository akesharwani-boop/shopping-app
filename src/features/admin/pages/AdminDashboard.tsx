import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import CreateUserModal from "../components/CreateUserModal";

export default function AdminDashboard() {
  const user = useAuthStore((s) => s.user);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Welcome {user?.name} 👋
      </h1>

      {(user?.role === "admin" || user?.role === "superadmin") && (
        <Button onClick={() => setOpen(true)}>
          Create User
        </Button>
      )}

      {open && (
        <CreateUserModal
          onClose={() => setOpen(false)}
          onSuccess={() => {}}
        />
      )}

      {/* Normal admin content */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="border p-4 rounded">Total Users</div>
        <div className="border p-4 rounded">Total Products</div>
        <div className="border p-4 rounded">Orders</div>
      </div>
    </div>
  );
}