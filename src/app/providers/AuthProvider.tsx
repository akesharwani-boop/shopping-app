import { createContext, useContext, useState } from "react";
import { storageService } from "@/services/storage.service";

type AuthContextType = {
  isAuthenticated: boolean
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!storageService.getAccessToken(),
  );
  const logout = () => {
    storageService.clearTokens();
    setIsAuthenticated(false);
    window.location.href = "/auth/login";
  };
//   useEffect(() => {
//   const token = storageService.getAccessToken();
//   setIsAuthenticated(!!token);
// }, []);
  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
