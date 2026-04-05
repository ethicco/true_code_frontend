import { useState, type FC } from "react";
import {
  Button,
  Form,
  Input,
  Upload,
  type UploadFile,
  type UploadProps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import type { SignUpFieldType, SignUpProps } from "./types";

import styles from "./SignUp.module.scss";

export const SignUp: FC<SignUpProps> = (props) => {
  const { handleChangeForm } = props;

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSignUp = () => {
    handleChangeForm("SIGN_IN");
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    let newFileList = [...info.fileList];

    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      classNames={{ root: styles.form }}
      autoComplete="off"
    >
      <Form.Item<SignUpFieldType>
        label="Аватар"
        name="avatar"
        rules={[{ required: true, message: "Please input your avatar!" }]}
      >
        <Input type={"file"} />
      </Form.Item>
      <Form.Item<SignUpFieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<SignUpFieldType>
        label="Имя"
        name="firstName"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<SignUpFieldType>
        label="Фамилия"
        name="lastName"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<SignUpFieldType>
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<SignUpFieldType>
        label="Подтверждение пароля"
        name="confirmPassword"
        className={styles.confirmPassword}
        rules={[{ required: true, message: "Please confirm your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<SignUpFieldType>
        label="Дата рождения"
        name="birthday"
        rules={[{ required: true, message: "Please input your birthday!" }]}
      >
        <Input type={"date"} />
      </Form.Item>

      <Form.Item<SignUpFieldType>
        label="О себе"
        name="birthday"
        rules={[{ required: true, message: "Please input your about!" }]}
      >
        <Input type={"text"} />
      </Form.Item>

      <Form.Item<SignUpFieldType>
        label="Тедефон"
        name="phone"
        rules={[{ required: true, message: "Please input your phone!" }]}
      >
        <Input type={"tel"} />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="link" htmlType="button" onClick={handleSignUp}>
          Войти
        </Button>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Зарегестрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};
