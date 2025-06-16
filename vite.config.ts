import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  server: {
    host: true,
    port: 3000,
    allowedHosts: true,
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
