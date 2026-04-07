import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signIn } from "../../../../api/authApi";
import type { ISignInRequest } from "../../../../api/dto/request/auth.request";

export const useSignIn = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ISignInRequest) => signIn(data),
    onSuccess: () => {
      navigate("/");
    },
  });
};
