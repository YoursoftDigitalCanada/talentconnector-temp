// src/api/applications.api.ts
import api from './axios';

/**
 * Shared application fields
 */
export interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location?: string;
  linkedIn?: string;
  coverLetter?: string;

  // General application fields
  preferredRole?: string;
  experience?: string;
  availability?: string;
  expectedSalary?: string;
  willingToRelocate?: string;
  skills?: string;
  consent?: boolean;

  // Job-specific fields
  jobTitle?: string;
  jobCompany?: string;
  jobLocation?: string;
}

/**
 * Backend response
 */
export interface ApplicationResponse {
  success: boolean;
  message: string;
}

/**
 * Submit GENERAL (Talent Pool) application
 * -> POST /api/applications/general
 */
export const submitGeneralApplication = async (
  data: ApplicationData,
  resumeFile: File
): Promise<ApplicationResponse> => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, String(value));
    }
  });

  formData.append('resume', resumeFile);

  const response = await api.post<ApplicationResponse>(
    '/applications/general',
    formData
  );

  return response.data;
};

/**
 * Submit JOB-SPECIFIC application
 * -> POST /api/applications/job
 */
export const submitJobApplication = async (
  data: ApplicationData,
  resumeFile: File
): Promise<ApplicationResponse> => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, String(value));
    }
  });

  formData.append('resume', resumeFile);

  const response = await api.post<ApplicationResponse>(
    '/applications/job',
    formData
  );

  return response.data;
};
