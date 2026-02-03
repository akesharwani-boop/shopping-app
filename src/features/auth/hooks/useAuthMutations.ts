
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { storageService } from "@/services/storage.service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

/* ===================== LOGIN ===================== */
export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: authApi.login,

    onSuccess: async (data) => {
      try {
        // 1️⃣ Tokens save
        storageService.setTokens(
          data.access_token,
          data.refresh_token
        );

        // 2️⃣ Profile API call
        const profile = await authApi.profile();

        // 3️⃣ User store me save
        setUser({
          name: profile.name,
          email: profile.email,
          avatar: profile.avatar ?? "",
        });

        toast.success("Logged in successfully");
        navigate("/products");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Failed to load profile");
      }
    },

    onError: () => {
      toast.error("Invalid email or password");
    },
  });
};

/* ===================== SIGNUP ===================== */
export const useSignupMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.register,

    onSuccess: () => {
      toast.success("Account created successfully");
      navigate("/auth/login");
    },

    onError: () => {
      toast.error("Signup failed");
    },
  });
};