// src/hooks/useJob.ts
import { useState, useEffect, useCallback } from 'react';
import { getJobBySlug } from '../api/jobs.api';
import type { Job } from '../api/jobs.api';
import { jobsData } from '../data/jobsData';

// Display format for job details (matching server structure but UI-friendly)
export interface DisplayJobDetail {
    id: string;
    title: string;
    slug: string;
    company: string;
    location: string;
    city: string;
    state: string;
    country: string;
    type: string;
    department: string;
    experience: string;
    description: string;
    fullDescription: string;
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
    skills: string[];
    salary: {
        min: number;
        max: number;
        currency: string;
        period: string;
    };
    showSalary: boolean;
    publishedAt: string;
    applicationDeadline?: string;
    isFeatured: boolean;
    isUrgent: boolean;
    isRemote: boolean;
}

// Transform server job to display format
const transformServerJob = (job: Job): DisplayJobDetail => ({
    id: job._id,
    title: job.title,
    slug: job.slug,
    company: 'TalentConnectors', // Server doesn't have company field
    location: job.location.remote
        ? 'Remote'
        : `${job.location.city}, ${job.location.state || job.location.country}`,
    city: job.location.city,
    state: job.location.state || '',
    country: job.location.country,
    type: job.jobType.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    department: job.department,
    experience: `${job.experienceYears.min}-${job.experienceYears.max} years`,
    description: job.shortDescription || job.description.substring(0, 200),
    fullDescription: job.description,
    requirements: job.requirements,
    responsibilities: job.responsibilities,
    benefits: job.benefits,
    skills: job.skills,
    salary: {
        min: job.salary.min,
        max: job.salary.max,
        currency: job.salary.currency,
        period: job.salary.period,
    },
    showSalary: job.showSalary,
    publishedAt: job.publishedAt || job.createdAt,
    applicationDeadline: job.applicationDeadline,
    isFeatured: job.isFeatured,
    isUrgent: false, // Server doesn't have urgent field
    isRemote: job.location.remote,
});

// Type for static job data
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

// Transform static job to display format
const transformStaticJob = (job: StaticJob): DisplayJobDetail => ({
    id: String(job.id),
    title: job.title,
    slug: String(job.id),
    company: job.company,
    location: job.location,
    city: job.city,
    state: job.state,
    country: job.country,
    type: job.type,
    department: job.industry,
    experience: job.experience,
    description: job.description,
    fullDescription: job.fullDescription || job.description,
    requirements: job.requirements,
    responsibilities: [],
    benefits: job.benefits,
    skills: job.tags,
    salary: {
        min: job.salary.min || 0,
        max: job.salary.max || 0,
        currency: job.salary.currency,
        period: job.salary.unit === 'hour' ? 'hourly' : 'yearly',
    },
    showSalary: !!(job.salary.min && job.salary.max),
    publishedAt: job.postedDate,
    applicationDeadline: job.closingDate || undefined,
    isFeatured: job.featured,
    isUrgent: job.urgent,
    isRemote: job.location.toLowerCase().includes('remote'),
});

interface UseJobResult {
    job: DisplayJobDetail | null;
    isLoading: boolean;
    error: string | null;
    isUsingFallback: boolean;
    refetch: () => void;
}

export const useJob = (slugOrId: string | undefined): UseJobResult => {
    const [job, setJob] = useState<DisplayJobDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUsingFallback, setIsUsingFallback] = useState(false);

    const fetchJob = useCallback(async () => {
        if (!slugOrId) {
            setJob(null);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await getJobBySlug(slugOrId);
            const transformedJob = transformServerJob(response.data.job);
            setJob(transformedJob);
            setIsUsingFallback(false);
        } catch (err) {
            console.warn('Failed to fetch job from API, using fallback data:', err);

            // Fallback to static data - try to find by ID or slug
            const staticJob = (jobsData as StaticJob[]).find(
                (j) => String(j.id) === slugOrId || String(j.id) === slugOrId
            );

            if (staticJob) {
                setJob(transformStaticJob(staticJob));
                setIsUsingFallback(true);
                setError('Using offline data - API unavailable');
            } else {
                setJob(null);
                setError('Job not found');
            }
        } finally {
            setIsLoading(false);
        }
    }, [slugOrId]);

    useEffect(() => {
        fetchJob();
    }, [fetchJob]);

    return {
        job,
        isLoading,
        error,
        isUsingFallback,
        refetch: fetchJob,
    };
};

export default useJob;
