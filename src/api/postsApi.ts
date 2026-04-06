import baseApi from "./baseApi";
import type { IPostListRequest, IPostListResponse } from "./dto";

export const getPostList = async (
  request: IPostListRequest,
): Promise<IPostListResponse> => {
  const response = await baseApi.get<IPostListResponse>("/posts", {
    params: request,
  });

  return response.data;
};
