import axios from 'axios';
import { API_PATHS, BASE_URL } from '../config/api';

// 创建axios实例
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 关键配置
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 在这里可以添加token等认证信息
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 统一错误处理
    const message = error.response?.data?.message || '请求失败，请稍后重试';
    return Promise.reject(new Error(message));
  }
);

// API方法
export const contactApi = {
  submit: async (data: any): Promise<any> => {
    return api.post(`${API_PATHS.CONTACT}/save`, data);
  },
};

// API方法
export const inquiryApi = {
  submit: async (data: any): Promise<any> => {
    return api.post(`${API_PATHS.INQUIRY}/save`, data);
  },
};

export const clientCaseApi = {
  getCurrentCase: async (): Promise<any> => {
    return api.get(`/client-case/current`);
  },
};

export const infoCollApi = {
  submitBasicInfo: async (data: any): Promise<any> => {
    return api.post(`${API_PATHS.INFO_COLL}/basic-info/save-or-update`, data);
  },
  getBasicInfo: async (clientCaseId: number): Promise<any> => {
    return api.get(`${API_PATHS.INFO_COLL}/basic-info/case/${clientCaseId}`);
  },
  submitSpouseInfo: async (data: any): Promise<any> => {
    return api.post(`${API_PATHS.INFO_COLL}/spouse-info/save-or-update`, data);
  },
  getSpouseInfo: async (clientCaseId: number): Promise<any> => {
    return api.get(`${API_PATHS.INFO_COLL}/spouse-info/case/${clientCaseId}`);
  },
  submitChildrenInfo: async (data: any): Promise<any> => {
    return api.post(`${API_PATHS.INFO_COLL}/children-info/save-or-update`, data);
  },
  getChildrenInfo: async (clientCaseId: number): Promise<any> => {
    return api.get(`${API_PATHS.INFO_COLL}/children-info/case/${clientCaseId}`);
  },
  submitResume: async (data: any): Promise<any> => {
    return api.post(`${API_PATHS.INFO_COLL}/resume/save-or-update`, data);
  },
  getResume: async (clientCaseId: number): Promise<any> => {
    return api.get(`${API_PATHS.INFO_COLL}/resume/case/${clientCaseId}`);
  },
  getAcademicHistory: (clientCaseId: number) => {
    return axios.get(`/api/infoColl/academicHistory/${clientCaseId}`);
  },
  submitAcademicHistory: (data: any) => {
    return axios.post('/api/infoColl/academicHistory', data);
  },
  getEmploymentHistory: async (clientCaseId: number): Promise<any> => {
    return api.get(`/api/infoColl/employment-history/case/${clientCaseId}`);
  },
  submitEmploymentHistory: async (data: any): Promise<any> => {
    return api.post(`/api/infoColl/employment-history/save-or-update`, data);
  },
  getEndeavorSubmission: async (clientCaseId: number): Promise<any> => {
    return api.get(`/task/endeavor-submission/case/${clientCaseId}`);
  },
  submitEndeavorSubmission: async (data: any): Promise<any> => {
    return api.post(`/task/endeavor-submission/save-or-update`, data);
  },
  getNationalImportance: async (clientCaseId: number): Promise<any> => {
    return api.get(`/task/national-importance/case/${clientCaseId}`);
  },
  submitNationalImportance: async (data: any): Promise<any> => {
    return api.post(`/task/national-importance/save-or-update`, data);
  },
};

// 可以添加其他API模块
export const userApi = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.get(`/user/doLogin`, {
        params: {
          email,
          password
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  isLogin: async () => {
    return api.get(`/user/isLogin`);
  },
  logout: async () => {
    return axios.get(`${BASE_URL}/user/logout`);
  }
};

export const caseApi = {
  getCases: () => {
    return axios.get('/api/cases');
  }
};
