export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
  about: string;
  phone: string;
  avatar: File;
}
