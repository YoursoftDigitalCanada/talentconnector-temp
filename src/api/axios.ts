// src/api/axios.ts
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

/**
 * API base URL
 * - Local: http://localhost:3001/api
 * - Production (Hostinger): /api
 */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Axios instance
 */
export const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  withCredentials: false, // no cookies needed
});

/**
 * Request interceptor
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error(
        'API Error:',
        error.response.status,
        error.response.data
      );
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Submit GENERAL (Talent Pool) Application
 */
export const submitGeneralApplication = async (
  data: Record<string, any>,
  resume: File
) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  formData.append('resume', resume);

  const response = await api.post(
    '/applications/general',
    formData
  );

  return response.data;
};

/**
 * Submit JOB-SPECIFIC Application
 */
export const submitJobApplication = async (
  data: Record<string, any>,
  resume: File
) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  formData.append('resume', resume);

  const response = await api.post(
    '/applications/job',
    formData
  );

  return response.data;
};

export default api;
