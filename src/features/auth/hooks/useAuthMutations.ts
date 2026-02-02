import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { storageService } from "@/services/storage.service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLoginMutation =()=>{
    const navigate=useNavigate()
    return useMutation({
        mutationFn: authApi.login,
        onSuccess:(data)=>{
            storageService.setTokens(data.access_token,data.refresh_token)
            toast.success("Logged in successfully");
            navigate('/products')
        },
        onError: () => {
      toast.error("Invalid email or password");
    },
    })
}

export const useSignupMutation=()=>{
    const navigate=useNavigate()
    return useMutation({
        mutationFn:authApi.register,
        onSuccess :()=>{
            navigate('/auth/login')
        }
    })
}