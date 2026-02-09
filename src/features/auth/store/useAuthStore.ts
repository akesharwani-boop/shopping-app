import { create } from "zustand";

type Role ='customer' |'admin' | 'superadmin'

type User = {
  id:number
  name: string;
  email: string;
  role: Role
  avatar?: string;
};

type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
