import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/api/postsApi";

export const useDeletePost = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postList"] });
    },
  });
};
