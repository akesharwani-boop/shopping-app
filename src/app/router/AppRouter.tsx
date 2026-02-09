import { Route, Routes } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import ProtectedRoutes from "./ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import ProductDetailsPage from "@/features/products/pages/ProductDetailsPage";
import ProductsPage from "@/features/products/pages/ProductsPage";
import { Navigate } from "react-router-dom";
import CartPage from "@/features/cart/pages/CartPage";
import WishlistPage from "@/features/wishlist/pages/WishlistPage";
import { AdminRoute } from "@/routes/ProtectedRoute";
import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import AdminLayout from "@/components/layout/AdminLayout";
import AdminUsersPage from "@/features/admin/pages/AdminUsersPage";
import AdminProductsPage from "@/features/admin/pages/AdminProductsPage";
import AdminCategoriesPage from "@/features/admin/pages/AdminCategoriesPage";
export default function AppRouter() {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<AppLayout />}>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsersPage />} />
             <Route path="products" element={<AdminProductsPage />} />
             <Route path="categories" element={<AdminCategoriesPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
