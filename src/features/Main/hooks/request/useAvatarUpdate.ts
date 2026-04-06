import { useMutation, useQueryClient } from "@tanstack/react-query";
import { avatarUpdate } from "@/api/usersApi";
import type { IAvatarUpdate } from "@/api/dto";

export const useAvatarUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IAvatarUpdate) => avatarUpdate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
