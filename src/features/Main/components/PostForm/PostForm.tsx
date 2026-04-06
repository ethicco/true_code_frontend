import { useState, type FC } from "react";
import { Button, Flex, Form, Input, Upload, type UploadFile } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import settings from "@/config/config";
import type { PostFormProps } from "./types";
import type { PostFieldType } from "../PostModal/types";

import styles from "./PostForm.module.scss";

const MAX_IMAGES = 5;

const PostForm: FC<PostFormProps> = (props) => {
  const { data, id, onFinish } = props;

  const [form] = Form.useForm<Pick<PostFieldType, "text">>();
  const [fileList, setFileList] = useState<UploadFile[]>(() => {
    if (!data || !id) return [];

    return data.images.map((url, index) => ({
      uid: String(index),
      name: `image-${index}`,
      status: "done" as const,
      url: `${settings.STATIC_URL}/${url}`,
    }));
  });

  const handleFinish = (values: Pick<PostFieldType, "text">) => {
    const images = fileList
      .filter((f) => f.originFileObj)
      .map((f) => f.originFileObj as File);

    const imagesUrls = fileList
      .filter((f) => f.url && !f.originFileObj)
      .map((f) => f.url as string);

    onFinish({ text: values.text, images, imagesUrls });
  };

  return (
    <Form
      form={form}
      name="post-form"
      layout="vertical"
      initialValues={{ text: data?.text }}
      onFinish={handleFinish}
      className={styles.form}
    >
      <Form.Item<Pick<PostFieldType, "text">>
        label="Текст поста"
        name="text"
        rules={[{ required: true, message: "Введите текст поста" }]}
      >
        <Input.TextArea rows={5} placeholder="Напишите что-нибудь..." />
      </Form.Item>

      <Form.Item label={`Изображения (до ${MAX_IMAGES})`}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={() => false}
          onChange={({ fileList: newList }) =>
            setFileList(newList.slice(0, MAX_IMAGES))
          }
          multiple
          accept="image/*"
        >
          {fileList.length < MAX_IMAGES && (
            <Flex vertical align="center">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Загрузить</div>
            </Flex>
          )}
        </Upload>
      </Form.Item>

      <Flex justify="flex-end">
        <Button type="primary" htmlType="submit">
          {id ? "Сохранить" : "Создать"}
        </Button>
      </Flex>
    </Form>
  );
};

export default PostForm;
