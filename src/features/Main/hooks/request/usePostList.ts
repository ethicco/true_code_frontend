import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostList } from "@/api/postsApi";

const PAGE_SIZE = 10;

export const usePostList = (sort: string) =>
  useInfiniteQuery({
    queryKey: ["postList", { sort }],
    queryFn: ({ pageParam }) =>
      getPostList({ page: pageParam, perPage: PAGE_SIZE, sort }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, perPage, totalCount } = lastPage.meta;
      return page * perPage < totalCount ? page + 1 : undefined;
    },
  });
