import type { AuthFormState } from "../../pages/types";

export type SignInProps = {
  handleChangeForm: (type: AuthFormState) => void;
};

export type SignInFieldType = {
  email: string;
  password: string;
};
