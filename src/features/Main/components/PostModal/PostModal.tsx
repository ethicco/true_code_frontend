import { type FC } from "react";
import { Modal, Typography } from "antd";

import type { PostFieldType, PostModalProps } from "./types";
import {
  usePostById,
  useCreatePost,
  useUpdatePost,
} from "@/features/Main/hooks";
import { PostForm } from "../PostForm";

import styles from "./PostModal.module.scss";

const PostModal: FC<PostModalProps> = (props) => {
  const { id, isOpen, setOpen } = props;

  const { data, isLoading } = usePostById(id!);
  const { mutate: createPost } = useCreatePost();
  const { mutate: updatePost } = useUpdatePost(id!);

  const onCancel = () => {
    setOpen(false);
  };

  const handleFinish = (payload: PostFieldType) => {
    if (!id) {
      createPost(payload, { onSuccess: () => setOpen(false) });
    } else {
      updatePost(payload, { onSuccess: () => setOpen(false) });
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
