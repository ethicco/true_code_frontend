import { useQuery } from "@tanstack/react-query";
import { me } from "@/api/usersApi";

export const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: me,
    retry: false,
    staleTime: Infinity,
  });
