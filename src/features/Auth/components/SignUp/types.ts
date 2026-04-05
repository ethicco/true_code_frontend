import type { AuthFormState } from "../../pages/types";

export type SignUpProps = {
  handleChangeForm: (type: AuthFormState) => void;
};

export type SignUpFieldType = {
  avatar: File;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  birthday: string;
  about: string;
  email: string;
  phone: string;
};
