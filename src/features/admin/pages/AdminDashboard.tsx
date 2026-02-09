
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CreateUserModal from "../components/CreateUserModal";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth(); 
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

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="border p-4 rounded">Total Users</div>
        <div className="border p-4 rounded">Total Products</div>
        <div className="border p-4 rounded">Orders</div>
      </div>
    </div>
  );
}
