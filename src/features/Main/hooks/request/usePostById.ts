import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/api/postsApi";

export const usePostById = (id: string) =>
  useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    enabled: !!id,
  });
