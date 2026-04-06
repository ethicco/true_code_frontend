import { type FC } from "react";
import { Button, Card, Flex, Image, Typography } from "antd";

import { formatDate } from "@/features/Main/utils";
import configs from "@/config/config";
import { useDeletePost, useMe } from "@/features/Main/hooks";
import type { PostProps } from "./types";

import styles from "./Post.module.scss";

const Post: FC<PostProps> = (props) => {
  const { post, setOpen } = props;

  const { data: user } = useMe();
  const { mutate: onDeletePost } = useDeletePost(post.id);

  const handleEditModal = () => {
    setOpen(post.id);
  };

  return (
    <Card
      className={styles.card}
      extra={
        post.userId === user?.id ? (
          <Flex gap={8}>
            <Button size="small" onClick={handleEditModal}>
              Редактировать
            </Button>
            <Button size="small" danger onClick={() => onDeletePost()}>
              Удалить
            </Button>
          </Flex>
        ) : null
      }
    >
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
                src={`${configs.STATIC_URL}/${src}`}
                width={120}
                height={120}
                style={{ objectFit: "cover", borderRadius: 4 }}
              />
            ))}
          </Flex>
        </Image.PreviewGroup>
      )}
    </Card>
  );
};

export default Post;
