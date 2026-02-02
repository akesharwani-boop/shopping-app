
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { storageService } from "@/services/storage.service";
import { useWishlistStore } from "@/features/wishlist/store/useWishlistStore";
import { useCartStore } from "@/features/cart/store/useCartStore";

export function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!storageService.getAccessToken();

  const wishlistCount = useWishlistStore((s) => s.items.length);
  const cartCount = useCartStore((s) => s.items.length);

  const logout = () => {
    storageService.clearTokens();
    navigate("/auth/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
   
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/products")}
      >
        
      </h1>

      <div className="flex items-center gap-6">
        
        <Link to="/wishlist" className="relative">
          <Heart className="w-6 h-6 text-gray-700" />

          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {wishlistCount}
            </span>
          )}
        </Link>

        <Link to="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-700" />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {isLoggedIn ? (
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button onClick={() => navigate("/auth/login")}>
            Login
          </Button>
        )}
      </div>
    </header>
  );
}