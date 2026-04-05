import baseApi from "./baseApi";
import type {
  ISignInRequest,
  ISignUpRequest,
} from "./dto/request/auth.request";
import type { IAuthResponse } from "./dto";

export const signIn = async (data: ISignInRequest): Promise<IAuthResponse> => {
  const response = await baseApi.post<IAuthResponse>("/auth/sign-in", data);

  return response.data;
};

export const signUp = async (data: ISignUpRequest): Promise<IAuthResponse> => {
  const formData = new FormData();
  formData.append("avatar", data.avatar);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("birthday", data.birthday);
  formData.append("about", data.about);
  formData.append("phone", data.phone);

  const response = await baseApi.post<IAuthResponse>(
    "/auth/sign-up",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  return response.data;
};

export const refreshToken = async (token: string): Promise<IAuthResponse> => {
  const response = await baseApi.post<IAuthResponse>(
    "/auth/refresh-token",
    null,
    { headers: { Authorization: `bearer ${token}` } },
  );

  return response.data;
};
