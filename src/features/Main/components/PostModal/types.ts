export type PostModalProps = {
  id: string | null;
  isOpen: boolean;
  setOpen: (type: boolean) => void;
};

export type PostFieldType = {
  text: string;
  images: Array<File>;
  imagesUrls: Array<string>;
};
