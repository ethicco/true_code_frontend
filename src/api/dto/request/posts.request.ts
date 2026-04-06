export interface IPostListRequest {
  page: number;
  perPage: number;
  userId?: string;
  sort?: string;
}
