import baseApi from "./baseApi";
import type { IAvatarUpdate, IUpdateProfile, IUserResponse } from "./dto";

export const me = async (): Promise<IUserResponse> => {
  const response = await baseApi.get<IUserResponse>("/users/me");

  return response.data;
};

export const avatarUpdate = async (data: IAvatarUpdate) => {
  const formData = new FormData();
  formData.append("avatar", data.avatar);

  const response = await baseApi.patch<IUserResponse>(
    "/users/avatar",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  return response.data;
};

export const updateProfile = async (
  data: IUpdateProfile,
): Promise<IUserResponse> => {
  const response = await baseApi.put<IUserResponse>("/users", data);

  return response.data;
};
