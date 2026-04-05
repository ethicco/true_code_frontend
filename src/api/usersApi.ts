import baseApi from "./baseApi";
import type { IUserResponse } from "./dto";

export const me = async (): Promise<IUserResponse> => {
  const response = await baseApi.get<IUserResponse>("/users/me");

  return response.data;
};
