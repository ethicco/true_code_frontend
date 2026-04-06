import { Modal, Typography } from "antd";
import { type FC } from "react";

import styles from "./PostModal.module.scss";
import type { PostFieldType, PostModalProps } from "./types";
import { usePostById, useCreatePost } from "@/features/Main/hooks";
import { PostForm } from "../PostForm";

const PostModal: FC<PostModalProps> = (props) => {
  const { id, isOpen, setOpen } = props;

  const { data, isLoading } = usePostById(id as string);
  const { mutate: createPost } = useCreatePost();

  const onCancel = () => {
    setOpen(false);
  };

  const handleFinish = (payload: PostFieldType) => {
    if (!id) {
      createPost(payload, { onSuccess: () => setOpen(false) });
    }
  };

  // key сбрасывает состояние PostForm при смене поста
  const formKey = id ? (data?.id ?? "loading") : "new";

  return (
    <Modal
      className={styles.header}
      title={
        <Typography.Text className={styles.header}>
          {id ? "Редактирование поста" : "Создание поста"}
        </Typography.Text>
      }
      footer={null}
      open={isOpen}
      loading={id ? isLoading : undefined}
      onCancel={onCancel}
      width={520}
    >
      <PostForm key={formKey} data={data} id={id} onFinish={handleFinish} />
    </Modal>
  );
};

export default PostModal;
