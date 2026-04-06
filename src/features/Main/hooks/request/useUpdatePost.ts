import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "@/api/postsApi";
import type { IUpdatePostRequest } from "@/api/dto";

export const useUpdatePost = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdatePostRequest) => updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postList"] });
    },
  });
};
