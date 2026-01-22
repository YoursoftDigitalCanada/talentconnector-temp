// src/hooks/useJobs.ts
import { useState, useEffect, useCallback } from 'react';
import { getJobs } from '../api/jobs.api';
import type { Job, JobsParams, Pagination } from '../api/jobs.api';
import { jobsData } from '../data/jobsData';

// Type for static job data (different structure than server)
interface StaticJob {
    id: number;
    title: string;
    company: string;
    location: string;
    country: string;
    state: string;
    city: string;
    type: string;
    category: string;
    industry: string;
    salary: {
        min: number | null;
        max: number | null;
        currency: string;
        unit: string;
    };
    postedDate: string;
    closingDate: string | null;
    urgent: boolean;
    featured: boolean;
    description: string;
    fullDescription?: string;
    requirements: string[];
    benefits: string[];
    tags: string[];
    shift: string;
    experience: string;
}

// Unified job type for the UI
export interface DisplayJob {
    id: string;
    title: string;
    company: string;
    location: string;
    city: string;
    state: string;
    country: string;
    type: string;
    department: string;
    description: string;
    salary: {
        min: number | null;
        max: number | null;
        currency: string;
        period: string;
    };
    skills: string[];
    benefits: string[];
    experience: string;
    isFeatured: boolean;
    isUrgent: boolean;
    publishedAt: string;
    slug: string;
}

// Transform server job to display format
const transformServerJob = (job: Job): DisplayJob => ({
    id: job._id,
    title: job.title,
    company: 'TalentConnectors', // Server doesn't have company field, use default
    location: job.location.remote ? 'Remote' : `${job.location.city}, ${job.location.state || job.location.country}`,
    city: job.location.city,
    state: job.location.state || '',
    country: job.location.country,
    type: job.jobType.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    department: job.department,
    description: job.shortDescription || job.description,
    salary: {
        min: job.showSalary ? job.salary.min : null,
        max: job.showSalary ? job.salary.max : null,
        currency: job.salary.currency,
        period: job.salary.period,
    },
    skills: job.skills,
    benefits: job.benefits,
    experience: `${job.experienceYears.min}-${job.experienceYears.max} years`,
    isFeatured: job.isFeatured,
    isUrgent: false, // Server doesn't have urgent field
    publishedAt: job.publishedAt || job.createdAt,
    slug: job.slug,
});

// Transform static job to display format
const transformStaticJob = (job: StaticJob): DisplayJob => ({
    id: String(job.id),
    title: job.title,
    company: job.company,
    location: job.location,
    city: job.city,
    state: job.state,
    country: job.country,
    type: job.type,
    department: job.industry,
    description: job.description,
    salary: {
        min: job.salary.min,
        max: job.salary.max,
        currency: job.salary.currency,
        period: job.salary.unit === 'hour' ? 'hourly' : 'yearly',
    },
    skills: job.tags,
    benefits: job.benefits,
    experience: job.experience,
    isFeatured: job.featured,
    isUrgent: job.urgent,
    publishedAt: job.postedDate,
    slug: String(job.id),
});

interface UseJobsResult {
    jobs: DisplayJob[];
    pagination: Pagination | null;
    isLoading: boolean;
    error: string | null;
    isUsingFallback: boolean;
    refetch: () => void;
}

export const useJobs = (params: JobsParams = {}): UseJobsResult => {
    const [jobs, setJobs] = useState<DisplayJob[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUsingFallback, setIsUsingFallback] = useState(false);

    const fetchJobs = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await getJobs(params);
            const transformedJobs = response.data.jobs.map(transformServerJob);
            setJobs(transformedJobs);
            setPagination(response.data.pagination);
            setIsUsingFallback(false);
        } catch (err) {
            console.warn('Failed to fetch jobs from API, using fallback data:', err);

            // Fallback to static data
            const staticJobs = (jobsData as StaticJob[]).map(transformStaticJob);

            // Apply client-side filtering for fallback
            let filteredJobs = [...staticJobs];

            if (params.search) {
                const query = params.search.toLowerCase();
                filteredJobs = filteredJobs.filter(
                    (job) =>
                        job.title.toLowerCase().includes(query) ||
                        job.description.toLowerCase().includes(query) ||
                        job.department.toLowerCase().includes(query)
                );
            }

            if (params.department) {
                filteredJobs = filteredJobs.filter(
                    (job) => job.department.toLowerCase() === params.department?.toLowerCase()
                );
            }

            // Sort by date (newest first)
            filteredJobs.sort(
                (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
            );

            // Apply pagination
            const page = params.page || 1;
            const limit = params.limit || 10;
            const start = (page - 1) * limit;
            const paginatedJobs = filteredJobs.slice(start, start + limit);

            setJobs(paginatedJobs);
            setPagination({
                page,
                limit,
                total: filteredJobs.length,
                pages: Math.ceil(filteredJobs.length / limit),
            });
            setIsUsingFallback(true);
            setError('Using offline data - API unavailable');
        } finally {
            setIsLoading(false);
        }
    }, [JSON.stringify(params)]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    return {
        jobs,
        pagination,
        isLoading,
        error,
        isUsingFallback,
        refetch: fetchJobs,
    };
};

export default useJobs;
