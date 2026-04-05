import { Layout, Typography } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { type FC } from "react";

import styles from "./Main.module.scss";
import { SiderMain } from "../components";

const MainPage: FC = () => {
  return (
    <Layout className={styles.wrapper}>
      <Header className={styles.header}>
        <Typography.Title level={3} className={styles.headerTitle}>
          Приложение
        </Typography.Title>
      </Header>
      <Layout>
        <SiderMain />
        <Content>Content</Content>
      </Layout>
      <Footer className={styles.footer}>
        <Typography.Text>
          © Copyright {new Date().getFullYear()}
        </Typography.Text>
      </Footer>
    </Layout>
  );
};

export default MainPage;
