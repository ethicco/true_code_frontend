import { Input } from "antd";
import type { FC } from "react";
import type { InputFileProps } from "./types";

const FileInput: FC<InputFileProps> = ({ onChange }) => (
  <Input
    type="file"
    accept="image/*"
    onChange={(e) => onChange?.(e.target.files?.[0])}
  />
);

export default FileInput;
