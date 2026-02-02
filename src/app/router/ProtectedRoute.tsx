import { Navigate,Outlet } from "react-router-dom";
import { storageService } from "@/services/storage.service";

export default function ProtectedRoutes(){
    // const token =storageService.getAccessToken()
    // return token? <Outlet/> : <Navigate to="/auth/login" replace/>
  const isAuthenticated = !!storageService.getAccessToken();

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
}