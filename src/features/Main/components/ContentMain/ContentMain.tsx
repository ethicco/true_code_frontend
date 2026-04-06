import { type FC, useEffect, useMemo, useRef, useState } from "react";
import { Content } from "antd/es/layout/layout";
import {
  Button,
  Card,
  Flex,
  Image,
  List,
  Select,
  Spin,
  Typography,
} from "antd";

import { usePostList } from "@/features/Main/hooks";
import { formatDate } from "@/features/Main/utils";
import settings from "@/config/config";

import styles from "./ContentMain.module.scss";

const ContentMain: FC = () => {
  const [sort, setSort] = useState("createdAt:desc");
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    usePostList(sort);

  const posts = useMemo(() => data?.pages.flatMap((p) => p.data) ?? [], [data]);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <Content className={styles.content}>
      <Flex justify="space-between" align="center" className={styles.header}>
        <Select
          value={sort}
          onChange={setSort}
          options={[
            { value: "createdAt:desc", label: "Сначала новые" },
            { value: "createdAt:asc", label: "Сначала старые" },
          ]}
          style={{ width: 180 }}
        />
        <Button type="primary" htmlType="button">
          Создать пост
        </Button>
      </Flex>

      <List
        className={styles.list}
        dataSource={posts}
        renderItem={(post) => (
          <List.Item key={post.id} style={{ padding: 0, border: "none" }}>
            <Card className={styles.card}>
              <Typography.Text type="secondary" className={styles.date}>
                {formatDate(post.createdAt)}
              </Typography.Text>
              <Typography.Paragraph className={styles.text}>
                {post.text}
              </Typography.Paragraph>
              {post.images.length > 0 && (
                <Image.PreviewGroup>
                  <Flex gap={8} wrap>
                    {post.images.map((src, i) => (
                      <Image
                        key={i}
                        src={`${settings.STATIC_URL}/${src}`}
                        width={120}
                        height={120}
                        style={{ objectFit: "cover", borderRadius: 4 }}
                      />
                    ))}
                  </Flex>
                </Image.PreviewGroup>
              )}
            </Card>
          </List.Item>
        )}
      />

      <div ref={sentinelRef} />

      {isFetchingNextPage && (
        <Flex justify="center" className={styles.spinner}>
          <Spin size="large" />
        </Flex>
      )}
    </Content>
  );
};

export default ContentMain;
