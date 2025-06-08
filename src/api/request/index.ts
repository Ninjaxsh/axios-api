// src/utils/api.ts
import axiosInstance from './axiosInstance';
// 封装常用的请求方法
const ApiRequestService = {
  async get<T>(url: string, params?: any): Promise<T> {
    const response = await axiosInstance.get<T>(url, { params });
    // 此处可以对 response.data 进行逻辑处理
    return response.data;
  },
  
  async post<T>(url: string, data?: any, header?: any): Promise<T> {
    const response = await axiosInstance.post<T>(url, data, {headers: header});
    return response.data; // 提取并返回 data
  },
  async put<T>(url: string, data: any): Promise<T> {
    const response = await axiosInstance.put<T>(url, data);
    return response.data; // 提取并返回 data
  },
  async delete<T>(url: string): Promise<T> {
    const response = await axiosInstance.delete<T>(url);
    return response.data; // 提取并返回 data
  },
};

export default ApiRequestService;
