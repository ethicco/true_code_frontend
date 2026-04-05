import type { FC } from "react";
import { Button, Form, Input } from "antd";

import type { SignInFieldType, SignInProps } from "./types";

import styles from "./SignIn.module.scss";

export const SignIn: FC<SignInProps> = (props) => {
  const { handleChangeForm } = props;

  const handleSignUp = () => {
    handleChangeForm("SIGN_UP");
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      classNames={{ root: styles.form }}
      autoComplete="off"
    >
      <Form.Item<SignInFieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<SignInFieldType>
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="link" htmlType="button" onClick={handleSignUp}>
          Зарегестрироваться
        </Button>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
