import type { IPostResponse } from "@/api/dto";
import type { PostFieldType } from "../PostModal/types";

export type PostFormProps = {
  data?: IPostResponse;
  id: string | null;
  onFinish: (payload: PostFieldType) => void;
};
