export interface IPostListRequest {
  page: number;
  perPage: number;
  userId?: string;
  sort?: string;
}

export interface IUpdatePost {
  text: string;
  images: Array<File>;
  imagesUrls: Array<string>;
}
