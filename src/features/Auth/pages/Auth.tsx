import { useState, type FC } from "react";
import type { AuthFormState } from "./types";
import { Layout } from "antd";
import { SignIn, SignUp } from "../components";

const AuthPage: FC = () => {
  const [formState, setFormState] = useState<AuthFormState>("SIGN_IN");

  if (formState === "SIGN_UP") {
    return (
      <Layout>
        <SignUp />
      </Layout>
    );
  }

  return (
    <Layout>
      <SignIn />
    </Layout>
  );
};

export default AuthPage;
