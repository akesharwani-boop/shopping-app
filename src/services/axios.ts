import axios from "axios";
import { storageService } from "./storage.service";
import type { AxiosRequestConfig,AxiosError } from "axios";
const BASE_URL = "https://api.escuelajs.co/api/v1";

type FailedQueueItem = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = storageService.getAccessToken();

   if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

type RetryAxiosRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

const processQueue = (
  error: unknown,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (token) {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${token}`,
            };
          }
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = storageService.getRefreshToken();

        if (!refreshToken) {
          storageService.clearTokens();
          window.location.href = "/auth/login";
          return Promise.reject(error);
        }

        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
          refreshToken,
        });

        const { access_token, refresh_token } = response.data;

        storageService.setTokens(access_token, refresh_token);

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        processQueue(null, access_token);

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        storageService.clearTokens();
        window.location.href = "/auth/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
