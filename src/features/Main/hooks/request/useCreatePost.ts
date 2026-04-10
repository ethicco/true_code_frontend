import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/postsApi";
import type { ICreatePostRequest, IPostListResponse } from "@/api/dto";
import type { InfiniteData } from "@tanstack/react-query";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreatePostRequest) => createPost(data),
    onSuccess: (newPost) => {
      queryClient.setQueriesData<InfiniteData<IPostListResponse>>(
        { queryKey: ["postList"], exact: false },
        (old) => {
          if (!old) return old;

          const [firstPage, ...restPages] = old.pages;

          return {
            ...old,
            pages: [
              {
                ...firstPage,
                meta: {
                  ...firstPage.meta,
                  totalCount: firstPage.meta.totalCount + 1,
                },
                data: [newPost, ...firstPage.data],
              },
              ...restPages,
            ],
          };
        },
      );
    },
  });
};
