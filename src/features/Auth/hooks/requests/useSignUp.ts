import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signUp } from "../../../../api/authApi";
import type { ISignUpRequest } from "../../../../api/dto/request/auth.request";

export const useSignUp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ISignUpRequest) => signUp(data),
    onSuccess: () => {
      navigate("/");
    },
  });
};
