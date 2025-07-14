import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
import svgLoader from "vite-svg-loader";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [vue(), svgLoader()],
    server: {
      host: true,
      port: 3000,
      allowedHosts: true,
      proxy: {
        [env.VITE_API_BASE_URL]: {
          target: env.VITE_PROXY_TARGET,
          changeOrigin: true,
          // rewrite: (path) => path.replace(new RegExp(`^${env.VITE_API_BASE_URL}`), ''),
        },
      },
    },
    // 对构建产物进行分包，以优化加载性能。
    build: {
      rollupOptions: {
         output: {
         manualChunks(id) {
             if (id.includes('node_modules')) {
              if (id.includes('vue')) {
               return 'vue';
              }
              if (id.includes('axios')) {
                return 'axios';
              }
              return 'vendor'; // 其他第三方库
            }
          }
        }
      }
    },   
  };
});
