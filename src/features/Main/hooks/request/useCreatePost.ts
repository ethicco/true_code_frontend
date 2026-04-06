import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/postsApi";
import type { ICreatePostRequest } from "@/api/dto";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreatePostRequest) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postList"] });
    },
  });
};
