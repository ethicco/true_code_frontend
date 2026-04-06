export interface IPostListRequest {
  page: number;
  perPage: number;
  userId?: string;
  sort?: string;
}

export interface IUpdatePostRequest {
  text: string;
  images: Array<File>;
  imagesUrls: Array<string>;
}

export interface ICreatePostRequest {
  text: string;
  images: Array<File>;
}
