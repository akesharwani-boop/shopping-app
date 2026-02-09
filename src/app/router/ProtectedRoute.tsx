
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoutes() {
  const { user, loading } = useAuth();


  if (loading) {
    return null; 
  }

  return user ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
