import type { FC } from "react";
import { Alert, Button, Form, Input } from "antd";

import type { SignInFieldType, SignInProps } from "./types";
import { useSignIn } from "@/features/Auth/hooks";

import styles from "./SignIn.module.scss";

export const SignIn: FC<SignInProps> = (props) => {
  const { handleChangeForm } = props;
  const { mutate: signIn, isPending, error } = useSignIn();

  const handleSignUp = () => {
    handleChangeForm("SIGN_UP");
  };

  const handleFinish = (values: SignInFieldType) => {
    signIn(values);
  };

  return (
    <Form
      name="sign-in"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      classNames={{ root: styles.form }}
      autoComplete="off"
      onFinish={handleFinish}
    >
      {error && (
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Alert
            description="Неверный email или пароль"
            type="error"
            showIcon
          />
        </Form.Item>
      )}

      <Form.Item<SignInFieldType>
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Введите email" },
          { type: "email", message: "Некорректный email" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<SignInFieldType>
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Введите пароль" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="link" htmlType="button" onClick={handleSignUp}>
          Зарегестрироваться
        </Button>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" loading={isPending}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
