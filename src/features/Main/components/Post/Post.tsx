import { type FC } from "react";
import { Button, Card, Flex, Image, Typography } from "antd";

import { type IPostResponse } from "@/api/dto/response/posts.response";
import { formatDate } from "@/features/Main/utils";
import settings from "@/config/config";

import styles from "./Post.module.scss";
import { useMe } from "../../hooks";

interface PostProps {
  post: IPostResponse;
}

const Post: FC<PostProps> = ({ post }) => {
  const { data: user } = useMe();

  return (
    <Card
      className={styles.card}
      extra={
        post.userId === user?.id ? (
          <Flex gap={8}>
            <Button size="small" onClick={() => {}}>
              Редактировать
            </Button>
            <Button size="small" danger onClick={() => {}}>
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
  );
};

export default Post;
