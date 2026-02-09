import { Link, useNavigate, NavLink } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";

export function Header() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const { items: cartItems } = useCart();

  const wishlistCount = wishlistItems.length;
  const cartCount = cartItems.length;
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
      {user && (
        <div
          className="relative cursor-pointer flex items-center gap-2"
          onClick={() => setOpen((prev) => !prev)}
        >
          <img
            src={user.avatar || "https://i.pravatar.cc/40"}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover border"
          />

          <span className="text-sm font-medium">{user.name}</span>

          {open && (
            <div
              className="absolute top-full left-0 mt-2 
                       bg-white border rounded shadow w-40 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="px-3 py-2 text-xs text-gray-500">
                Role: {user.role.toUpperCase()}
              </p>

              {(user.role === "admin" || user.role === "superadmin") && (
                <NavLink
                  to="/admin/users"
                  className="block px-3 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Admin Panel
                </NavLink>
              )}

              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-6">
        <Link to="/wishlist" className="relative">
          <Heart className="w-6 h-6 text-gray-700" />
          {wishlistCount > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-red-500 text-white
                             text-xs w-5 h-5 flex items-center justify-center rounded-full"
            >
              {wishlistCount}
            </span>
          )}
        </Link>

        <Link to="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          {cartCount > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-black text-white
                             text-xs w-5 h-5 flex items-center justify-center rounded-full"
            >
              {cartCount}
            </span>
          )}
        </Link>

        {!user && (
          <Button onClick={() => navigate("/auth/login")}>Login</Button>
        )}
      </div>
    </header>
  );
}
