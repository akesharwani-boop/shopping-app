// src/app/layout/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import AdminSidebar from "@/features/admin/components/AdminSidebar";

export default function AdminLayout() {
  const user = useAuthStore((s) => s.user);

  // 🔒 safety
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