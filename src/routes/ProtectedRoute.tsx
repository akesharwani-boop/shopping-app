import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export function AdminRoute({ children }: { children: ReactNode }) {
  const user = useAuthStore((s) => s.user);

  if (!user) return <Navigate to="/auth/login" />;

  if (user.role !== "admin" && user.role !== "superadmin") {
    return <Navigate to="/products" />;
  }

  return <>{children}</>;
}