
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart,User} from "lucide-react"
import { Button } from "@/components/ui/button";
import { storageService } from "@/services/storage.service";
import { useWishlistStore } from "@/features/wishlist/store/useWishlistStore";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export function Header() {
  const navigate = useNavigate();

  //  AUTH STORE
  const user = useAuthStore((s) => s.user);
  const clearUser = useAuthStore((s) => s.logout);

  const wishlistCount = useWishlistStore((s) => s.items.length);
  const cartCount = useCartStore((s) => s.items.length);

  const logout = () => {
    storageService.clearTokens(); // tokens clear
    clearUser();                  //  user clear
    navigate("/auth/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
      
      {/* LOGO */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/products")}
      >
        ALPINE
      </h1>

      <div className="flex items-center gap-6">
        
        {/* WISHLIST */}
        <Link to="/wishlist" className="relative">
          <Heart className="w-6 h-6 text-gray-700" />
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs
                             w-5 h-5 flex items-center justify-center rounded-full">
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* CART */}
        <Link to="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs
                             w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {/* 👤 PROFILE */}
        {user ? (
          <>
            <div className="flex flex-col items-center cursor-pointer">
              
              {/* ICON */}
              <div className="w-10 h-10 rounded-full border
                              flex items-center justify-center">
                <User className="w-5 h-5 text-gray-700" />
              </div>

              {/* NAME */}
              <span className="text-xs mt-1 font-medium text-gray-800">
                {user.name}
              </span>
            </div>

            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <Button onClick={() => navigate("/auth/login")}>
            Login
          </Button>
        )}
      </div>
    </header>
  );
}