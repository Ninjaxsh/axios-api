// src/utils/axiosInstance.ts
import axios, { type AxiosInstance } from "axios";

const baseURL=import.meta.env.VITE_API_BASE_URL || "/dev-api"; // 使用环境变量或默认值
console.log("baseURL:", baseURL);
// 创建和配置 Axios 实例
const axiosInstance: AxiosInstance = axios.create({
  // baseURL: '/dev-api/api/v1', // 替换为你的远程API地址
  baseURL,
  timeout: 15000, // 设置请求超时
  withCredentials: true, // 是否携带凭证
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 在这里可以添加请求头，例如 Authentication 令牌
    const token = localStorage.getItem('auth-token'); // 示例：从 localStorage 获取 token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
    // 处理 HTTP 网络错误
    let message = "发生未知错误";
    if (error.response) {
      // 服务器返回了响应，但状态码不是 2xx
      switch (error.response.status) {
        case 401:
          message = "未授权，请重新登录";
          // 此处可以执行跳转到登录页等操作
          break;
        case 403:
          message = "拒绝访问";
          break;
        case 404:
          message = "请求资源未找到";
          break;
        case 500:
          message = "服务器内部错误";
          break;
        default:
          message = `请求错误: ${error.response.status}`;
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      message = "网络连接超时，请检查您的网络";
    } else {
      // 设置请求时发生了一些事情，触发了错误
      message = error.message;
    }
    // 在这里可以使用 UI 组件库（如 Element Plus, Ant Design Vue）弹出全局错误提示
    console.error(message); 
    // alert(message); // 或者简单的 alert
    return Promise.reject(error);
  }
);

export default axiosInstance;
