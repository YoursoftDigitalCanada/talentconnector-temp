// src/api/jobs.api.ts
import api from './axios';

// Types matching server Job model
export interface JobLocation {
    city: string;
    state?: string;
    country: string;
    remote: boolean;
}

export interface JobSalary {
    min: number;
    max: number;
    currency: string;
    period: 'hourly' | 'monthly' | 'yearly';
}

export interface Job {
    _id: string;
    title: string;
    slug: string;
    description: string;
    shortDescription?: string;
    requirements: string[];
    responsibilities: string[];
    location: JobLocation;
    department: string;
    jobType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote';
    experienceLevel: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
    experienceYears: {
        min: number;
        max: number;
    };
    salary: JobSalary;
    showSalary: boolean;
    skills: string[];
    benefits: string[];
    status: string;
    applicationDeadline?: string;
    positions: number;
    applicationsCount: number;
    views: number;
    isFeatured: boolean;
    publishedAt?: string;
    closedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

export interface JobsResponse {
    success: boolean;
    statusCode: number;
    data: {
        jobs: Job[];
        pagination: Pagination;
    };
    message: string;
}

export interface SingleJobResponse {
    success: boolean;
    statusCode: number;
    data: {
        job: Job;
    };
    message: string;
}

export interface DepartmentsResponse {
    success: boolean;
    data: {
        departments: string[];
    };
}

export interface DepartmentCountsResponse {
    success: boolean;
    data: {
        departments: Array<{
            _id: string;
            count: number;
        }>;
    };
}

export interface JobsParams {
    page?: number;
    limit?: number;
    search?: string;
    department?: string;
    jobType?: string;
    experienceLevel?: string;
    remote?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

// Get all public jobs with optional filters
export const getJobs = async (params: JobsParams = {}): Promise<JobsResponse> => {
    const response = await api.get<JobsResponse>('/public/jobs', { params });
    return response.data;
};

// Get single job by slug
export const getJobBySlug = async (slug: string): Promise<SingleJobResponse> => {
    const response = await api.get<SingleJobResponse>(`/public/jobs/${slug}`);
    return response.data;
};

// Get all departments
export const getDepartments = async (): Promise<DepartmentsResponse> => {
    const response = await api.get<DepartmentsResponse>('/public/departments');
    return response.data;
};

// Get job counts by department
export const getJobCountByDepartment = async (): Promise<DepartmentCountsResponse> => {
    const response = await api.get<DepartmentCountsResponse>('/public/departments/counts');
    return response.data;
};
