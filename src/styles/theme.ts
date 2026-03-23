import type { ThemeConfig } from "antd";

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff",
    colorBgBase: "#0a1929",
    colorTextBase: "#d6e4f0",
    colorBorder: "rgba(120,170,210,0.35)",
    borderRadius: 8,
  },
  components: {
    Layout: {
      bodyBg: "#0a1929",
      siderBg: "#0f2336",
      headerBg: "#0f2336",
    },
    Card: {
      colorBgContainer: "rgba(18, 38, 58, 0.72)",
    },
    Table: {
      colorBgContainer: "rgba(18, 38, 58, 0.72)",
    },
  },
};

