import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: ["api.skpay.com"],
    proxy: {
      "/dev-api/": {
        target: "http://sms.skpay.com",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/dev-api/, ""),
      },
      "/prod-api/": {
        target: "http://sms.skpay.com",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/prod-api/, ""),
      },
    },
  },
});
