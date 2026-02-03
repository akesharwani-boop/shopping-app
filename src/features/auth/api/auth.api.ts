import { axiosInstance } from "@/services/axios";
import {
  type LoginRequest,
  type RegisterRequest,
  type AuthResponse,
} from "../types/auth.types";

export const authApi = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      data,
    );
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>("/users", data);
    return response.data;
  },

  async profile() {
    const response = await axiosInstance.get("/auth/profile");
    return response.data;
  },
};
