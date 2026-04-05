import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import config from "../config/config";
import { getCookie, setCookie, removeCookie } from "./cookies";
import { refreshToken } from "./authApi";

const BASE_URL = config.BASE_URL;

const baseApi = axios.create({
  baseURL: BASE_URL,
});

baseApi.defaults.headers.common["Content-Type"] = "application/json";

baseApi.interceptors.request.use(
  (requestConfig: InternalAxiosRequestConfig) => {
    const token = getCookie("accessToken");

    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }

    return requestConfig;
  },
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });

  failedQueue = [];
};

baseApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const storedRefreshToken = getCookie("refreshToken");

    if (!storedRefreshToken) {
      removeCookie("accessToken");

      window.location.href = "/auth";

      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;

        return baseApi(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const data = await refreshToken(storedRefreshToken);

      setCookie("accessToken", data.accessToken);
      setCookie("refreshToken", data.refreshToken);
      processQueue(null, data.accessToken);

      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

      return baseApi(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);

      removeCookie("accessToken");
      removeCookie("refreshToken");

      window.location.href = "/auth";

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default baseApi;
