import { useState, type FC } from "react";
import { Layout } from "antd";

import type { AuthFormState } from "./types";
import { SignIn, SignUp } from "../components";

import { Content } from "antd/es/layout/layout";

import styles from "./Auth.module.scss";

const AuthPage: FC = () => {
  const [formState, setFormState] = useState<AuthFormState>("SIGN_IN");

  const handleChange = (type: AuthFormState) => {
    setFormState(type);
  };

  if (formState === "SIGN_UP") {
    return (
      <Layout className={styles.container}>
        <Content className={styles.content}>
          <SignUp handleChangeForm={handleChange} />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className={styles.container}>
      <Content className={styles.content}>
        <SignIn handleChangeForm={handleChange} />
      </Content>
    </Layout>
  );
};

export default AuthPage;
