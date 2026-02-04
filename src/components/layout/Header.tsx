import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { storageService } from "@/services/storage.service";
import { useWishlistStore } from "@/features/wishlist/store/useWishlistStore";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export function Header() {
  const navigate = useNavigate();

  const user = useAuthStore((s) => s.user);
  const logoutUser = useAuthStore((s) => s.logout);

  const wishlistCount = useWishlistStore((s) => s.items.length);
  const cartCount = useCartStore((s) => s.items.length);

  const logout = () => {
    storageService.clearTokens();
    logoutUser();
    navigate("/auth/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
      
      {/* LEFT SIDE: PROFILE */}
      {user && (
        <div className="flex items-center gap-3 relative group cursor-pointer">
          <User className="w-6 h-6 text-gray-700" />

          <span className="text-sm font-medium">
            {user.name}
          </span>

          {/*  DROPDOWN */}
          <div className="absolute left-0 top-full mt-2 hidden group-hover:block
                          bg-white border rounded shadow w-44 z-50">
            
            <div className="px-3 py-2 text-xs text-gray-500 border-b">
              Role: {user.role.toUpperCase()}
            </div>

            {(user.role === "admin" || user.role === "superadmin") && (
              <Link
                to="/admin"
                className="block px-3 py-2 hover:bg-gray-100 text-sm"
              >
                Admin Panel
              </Link>
            )}

            <button
              onClick={logout}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* RIGHT SIDE: ICONS */}
      <div className="flex items-center gap-6">
        
        {/*  Wishlist */}
        <Link to="/wishlist" className="relative">
          <Heart className="w-6 h-6 text-gray-700" />
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white
                             text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* 🛒 Cart */}
        <Link to="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white
                             text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {!user && (
          <Button onClick={() => navigate("/auth/login")}>
            Login
          </Button>
        )}
      </div>
    </header>
  );
}