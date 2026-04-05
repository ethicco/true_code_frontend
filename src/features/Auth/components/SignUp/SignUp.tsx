import type { FC } from "react";
import { Alert, Button, Form, Input } from "antd";

import type { SignUpFieldType, SignUpProps } from "./types";
import { useSignUp } from "@/features/Auth/hooks";

import styles from "./SignUp.module.scss";
import FileInput from "@/components/InputFile/InputFile";

export const SignUp: FC<SignUpProps> = (props) => {
  const { handleChangeForm } = props;
  const { mutate: signUp, isPending, error } = useSignUp();

  const handleSignIn = () => {
    handleChangeForm("SIGN_IN");
  };

  const handleFinish = (values: SignUpFieldType) => {
    signUp(values);
  };

  return (
    <Form
      name="sign-up"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      classNames={{ root: styles.form }}
      autoComplete="off"
      onFinish={handleFinish}
    >
      {error && (
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Alert
            description="Ошибка регистрации. Проверьте данные."
            type="error"
            showIcon
          />
        </Form.Item>
      )}

      <Form.Item<SignUpFieldType>
        label="Аватар"
        name="avatar"
        rules={[{ required: true, message: "Загрузите изображение" }]}
      >
        <FileInput />
      </Form.Item>

      <Form.Item<SignUpFieldType>
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Введите email" },
          { type: "email", message: "Некорректный email" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<SignUpFieldType>
        label="Имя"
        name="firstName"
        rules={[{ required: true, message: "Введите имя" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<SignUpFieldType>
        label="Фамилия"
        name="lastName"
        rules={[{ required: true, message: "Введите фамилию" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<SignUpFieldType>
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Введите пароль" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<SignUpFieldType>
        label="Подтверждение пароля"
        name="confirmPassword"
        className={styles.confirmPassword}
        dependencies={["password"]}
        rules={[
          { required: true, message: "Подтвердите пароль" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Пароли не совпадают"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<SignUpFieldType>
        label="Дата рождения"
        name="birthday"
        rules={[{ required: true, message: "Введите дату рождения" }]}
      >
        <Input type="date" />
      </Form.Item>

      <Form.Item<SignUpFieldType>
        label="О себе"
        name="about"
        rules={[{ required: true, message: "Расскажите о себе" }]}
      >
        <Input type="text" />
      </Form.Item>

      <Form.Item<SignUpFieldType>
        label="Телефон"
        name="phone"
        rules={[{ required: true, message: "Введите телефон" }]}
      >
        <Input type="tel" />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="link" htmlType="button" onClick={handleSignIn}>
          Войти
        </Button>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" loading={isPending}>
          Зарегестрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};
