import { Space, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { APP_TITLE } from "@/utils/constants";

export const HeaderContent = () => (
  <Space style={{ color: "#d6e4f0" }}>
    <Tag color="blue">Demo</Tag>
    <Typography.Text style={{ color: "#d6e4f0" }}>{APP_TITLE}</Typography.Text>
    <Typography.Text type="secondary">{dayjs().format("YYYY-MM-DD HH:mm")}</Typography.Text>
  </Space>
);

