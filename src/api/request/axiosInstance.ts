// src/utils/axiosInstance.ts
import axios, { type AxiosInstance } from "axios";
// 创建和配置 Axios 实例
const axiosInstance: AxiosInstance = axios.create({
  // baseURL: '/dev-api/api/v1', // 替换为你的远程API地址
  baseURL: import.meta.env.VITE_API_BASE_URL || "/dev-api", // 使用环境变量或默认值
  timeout: 15000, // 设置请求超时
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 在这里可以添加请求头，例如 Authentication 令牌
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // 直接返回响应数据
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
