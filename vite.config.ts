import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("@xyflow/react")) return "react-flow";
          if (id.includes("echarts")) return "echarts";
          if (id.includes("antd") || id.includes("@ant-design")) return "antd";
          return undefined;
        },
      },
    },
  },
});

