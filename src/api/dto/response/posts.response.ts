export interface IPostResponse {
  id: string;
  text: string;
  images: Array<string>;
  createdAt: string;
  userId: string;
}

export interface IPostListResponse {
  meta: {
    page: number;
    perPage: number;
    totalCount: number;
  };
  data: Array<IPostResponse>;
}
