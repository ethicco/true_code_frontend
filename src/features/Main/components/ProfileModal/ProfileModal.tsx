import { Alert, Button, Flex, Form, Input, Modal, Typography } from "antd";
import type { FC } from "react";
import type { ProfileModalProps, UserProfileFieldType } from "./types";

import { useMe, useUpdateProfile } from "@/features/Main/hooks";

import styles from "./ProfileModal.module.scss";

const ProfileModal: FC<ProfileModalProps> = (props) => {
  const { isOpen, setOpen } = props;

  const { data: user, isLoading, error } = useMe();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const onCancel = () => {
    setOpen(false);
  };

  const handleFinish = (values: UserProfileFieldType) => {
    updateProfile(values);
  };

  return (
    <Modal
      className={styles.header}
      title={
        <Typography.Text className={styles.header}>
          Редактирование профиля пользователя
        </Typography.Text>
      }
      footer={null}
      open={isOpen}
      loading={isLoading}
      onCancel={onCancel}
    >
      <Form
        name="sign-up"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        classNames={{ root: styles.form }}
        autoComplete="off"
        initialValues={user}
        onFinish={handleFinish}
      >
        {error && (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Alert
              description="Ошибка регистрации. Проверьте данные."
              type="error"
              showIcon
            />
          </Form.Item>
        )}

        <Form.Item<UserProfileFieldType> label="Имя" name="firstName">
          <Input />
        </Form.Item>

        <Form.Item<UserProfileFieldType> label="Фамилия" name="lastName">
          <Input />
        </Form.Item>

        <Form.Item<UserProfileFieldType> label="Дата рождения" name="birthday">
          <Input type="date" />
        </Form.Item>

        <Form.Item<UserProfileFieldType> label="О себе" name="about">
          <Input type="text" />
        </Form.Item>

        <Form.Item<UserProfileFieldType> label="Телефон" name="phone">
          <Input type="tel" />
        </Form.Item>

        <Flex justify={"flex-end"}>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Обновить
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default ProfileModal;
