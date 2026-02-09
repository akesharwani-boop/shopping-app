import { Outlet } from "react-router-dom";
import AdminSidebar from "@/features/admin/components/AdminSidebar";
import { useAuth } from "@/context/AuthContext";
export default function AdminLayout() {
  const { user } = useAuth();

  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
