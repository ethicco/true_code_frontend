import baseApi from "./baseApi";
import type {
  ICreatePostRequest,
  IPostListRequest,
  IPostListResponse,
  IPostResponse,
  IUpdatePostRequest,
} from "./dto";

export const getPostList = async (
  request: IPostListRequest,
): Promise<IPostListResponse> => {
  const response = await baseApi.get<IPostListResponse>("/posts", {
    params: request,
  });

  return response.data;
};

export const updatePost = async (id: string, data: IUpdatePostRequest) => {
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

export const createPost = async (data: ICreatePostRequest) => {
  const formData = new FormData();
  formData.append("text", data.text);

  data.images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await baseApi.post<IPostResponse>(`/posts`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const deletePost = async (id: string) => {
  const response = await baseApi.delete<IPostResponse>(`/posts/${id}`);

  return response.data;
};
