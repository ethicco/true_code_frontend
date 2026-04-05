import baseApi from "./baseApi";

export const refreshToken = async () => {
  const { data } = await baseApi.post("/auth/refresh-token");

  return data;
};
