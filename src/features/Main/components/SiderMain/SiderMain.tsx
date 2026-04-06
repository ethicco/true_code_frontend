import {
  Avatar,
  Button,
  Descriptions,
  Skeleton,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import Sider from "antd/es/layout/Sider";
import { CameraOutlined, UserOutlined } from "@ant-design/icons";
import { useState, type FC } from "react";

import { useMe, useAvatarUpdate } from "@/features/Main/hooks";
import config from "@/config/config";
import ProfileModal from "../ProfileModal/ProfileModal";

import styles from "./SiderMain.module.scss";

const SiderMain: FC = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const { data: user, isLoading, isError } = useMe();
  const { mutate: updateAvatar } = useAvatarUpdate();

  const handleUploadChange = (info: UploadChangeParam) => {
    const file = info.file.originFileObj ?? (info.file as unknown as File);

    if (!file) return;

    updateAvatar({ avatar: file });

    const objectUrl = URL.createObjectURL(file);

    setAvatarUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);

      return objectUrl;
    });
  };

  const avatarSrc =
    avatarUrl ??
    (user ? `${config.STATIC_URL}/${user.avatar}` : undefined) ??
    undefined;

  return (
    <Sider width="320px" className={styles.sider}>
      <div className={styles.siderContent}>
        {isLoading ? (
          <>
            <Skeleton.Avatar active size={96} shape="circle" />
            <Skeleton
              active
              title={{ width: "60%" }}
              paragraph={{ rows: 4 }}
              className={styles.skeleton}
            />
          </>
        ) : (
          <>
            <Tooltip title="Обновить фото профиля">
              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleUploadChange}
                className={styles.avatarUpload}
              >
                <div className={styles.avatarWrapper}>
                  <Avatar
                    size={96}
                    src={avatarSrc}
                    icon={!avatarSrc ? <UserOutlined /> : undefined}
                    className={styles.avatar}
                  />
                  <div className={styles.avatarOverlay}>
                    <CameraOutlined className={styles.cameraIcon} />
                  </div>
                </div>
              </Upload>
            </Tooltip>

            {isError && (
              <Typography.Text type="danger">
                Не удалось загрузить профиль
              </Typography.Text>
            )}

            {user && (
              <>
                <Typography.Title level={5} className={styles.userName}>
                  {user.firstName} {user.lastName}
                </Typography.Title>
                <Descriptions
                  column={1}
                  size="small"
                  className={styles.descriptions}
                  items={[
                    { key: "email", label: "Email", children: user.email },
                    {
                      key: "phone",
                      label: "Телефон",
                      children: user.phone,
                    },
                    {
                      key: "birthday",
                      label: "Дата рождения",
                      children: user.birthday
                        ? new Date(user.birthday).toLocaleDateString("ru-RU")
                        : "—",
                    },
                    {
                      key: "about",
                      label: "О себе",
                      children: user.about || "—",
                    },
                  ]}
                />
              </>
            )}
          </>
        )}
      </div>
      <Button
        className={styles.button}
        htmlType="button"
        onClick={() => setOpen(true)}
      >
        Редактировать профиль
      </Button>
      <ProfileModal isOpen={isOpen} setOpen={setOpen} />
    </Sider>
  );
};

export default SiderMain;
