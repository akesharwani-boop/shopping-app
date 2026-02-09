import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

export function AdminRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  //  wait till auth restores from storage
  if (loading) return null;

  //  not logged in
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  //  not admin
  if (user.role !== "admin" && user.role !== "superadmin") {
    return <Navigate to="/products" replace />;
  }

  //  allowed
  return <>{children}</>;
}
