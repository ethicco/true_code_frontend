export type ProfileModalProps = {
  isOpen: boolean;
  setOpen: (type: boolean) => void;
};

export type UserProfileFieldType = {
  firstName: string;
  lastName: string;
  birthday: string;
  about: string;
  phone: string;
};
