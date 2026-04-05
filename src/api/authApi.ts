import baseApi from "./baseApi";
import type {
  ISignInRequest,
  ISignUpRequest,
} from "./dto/request/auth.request";
import type { IAuthResponse } from "./dto/response/auth.response";

export const signIn = async (data: ISignInRequest): Promise<IAuthResponse> => {
  const response = await baseApi.post<IAuthResponse>("/auth/sign-in", data);

  return response.data;
};

export const signUp = async (data: ISignUpRequest): Promise<IAuthResponse> => {
  const response = await baseApi.post<IAuthResponse>("/auth/sign-up", data);

  return response.data;
};

export const refreshToken = async (token: string): Promise<IAuthResponse> => {
  const response = await baseApi.post<IAuthResponse>("/auth/refresh-token", {
    refreshToken: token,
  });

  return response.data;
};
