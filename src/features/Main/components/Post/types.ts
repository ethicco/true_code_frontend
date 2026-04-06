import type { IPostResponse } from "@/api/dto";

export interface PostProps {
  post: IPostResponse;
  setOpen: (postId: string) => void;
}
