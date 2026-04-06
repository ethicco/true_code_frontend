import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/api/usersApi";
import type { IUpdateProfile } from "@/api/dto";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdateProfile) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
