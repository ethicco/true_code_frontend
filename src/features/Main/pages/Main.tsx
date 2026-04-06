import type { FC } from "react";
import { Layout, Typography } from "antd";
import { Footer, Header } from "antd/es/layout/layout";

import { ContentMain, SiderMain } from "../components";

import styles from "./Main.module.scss";

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
        <ContentMain />
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
