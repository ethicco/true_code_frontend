import { Modal, Typography } from "antd";
import type { FC } from "react";

import styles from "./PostModal.module.scss";
import type { PostModalProps } from "./types";
import { usePostById } from "@/features/Main/hooks";

const PostModal: FC<PostModalProps> = (props) => {
  const { id, isOpen, setOpen } = props;

  const onCancel = () => {
    setOpen(false);
  };

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
      loading={undefined}
      onCancel={onCancel}
    >
      Post
    </Modal>
  );
};

export default PostModal;
