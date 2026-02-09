import { createContext, useContext, useEffect, useState } from "react";
import { storageService } from "@/services/storage.service";

type Role = "customer" | "admin" | "superadmin";

export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  //  RESTORE LOGIN ON REFRESH
  useEffect(() => {
    const token = storageService.getAccessToken();
    const storedUser = localStorage.getItem("auth_user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("auth_user", JSON.stringify(user));
  };

  const logout = () => {
    storageService.clearTokens();
    localStorage.removeItem("auth_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
