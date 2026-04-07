import { refreshToken } from "@/api/authApi";
import type { Config } from "@/api/baseApi";
import type { AxiosError, AxiosResponse } from "axios";
import { useEffect, type ReactNode } from "react";
import instanceAxios from "@/api/baseApi";

const AxiosInterceptor = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const resInterceptor = async (response: AxiosResponse) => {
      return response;
    };

    const errInterceptor = async (error: AxiosError) => {
      const originalConfig = error.config as Config;

      if (error.response?.status === 401 && !originalConfig.retry) {
        originalConfig.retry = true;

        await refreshToken();
      }

      return Promise.reject({
        code: error.response?.status,
        message: error.message,
      });
    };

    const interceptor = instanceAxios.interceptors.response.use(
      resInterceptor,
      errInterceptor,
    );

    return () => instanceAxios.interceptors.response.eject(interceptor);
  }, []);

  return children;
};

export default AxiosInterceptor;
