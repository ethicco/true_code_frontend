import baseApi from "./baseApi";
import type {
  IPostListRequest,
  IPostListResponse,
  IPostResponse,
  IUpdatePost,
} from "./dto";

export const getPostList = async (
  request: IPostListRequest,
): Promise<IPostListResponse> => {
  const response = await baseApi.get<IPostListResponse>("/posts", {
    params: request,
  });

  return response.data;
};

export const updatePost = async (id: string, data: IUpdatePost) => {
  const formData = new FormData();
  formData.append("text", data.text);

  data.images.forEach((image) => {
    formData.append("images", image);
  });

  data.imagesUrls.forEach((url) => {
    formData.append("imagesUrls", url);
  });

  const response = await baseApi.put<IPostResponse>(`/posts/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const getPost = async (id: string): Promise<IPostResponse> => {
  const response = await baseApi.get<IPostResponse>(`/posts/${id}`);

  return response.data;
};
