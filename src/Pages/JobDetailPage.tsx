// src/pages/JobDetailPage.tsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { submitJobApplication  } from '../api/applications.api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Building2,
  Clock,
  DollarSign,
  Calendar,
  Briefcase,
  CheckCircle,
  Share2,
  Linkedin,
  Twitter,
  Facebook,
  Mail,
  ChevronRight,
  Upload,
  X,
  FileText,
  Send,
  Star,
  AlertCircle,
  Bookmark,
  ExternalLink,
  ArrowLeft,
  Award,
  Users,
  Zap,
  Loader2,
  Copy,
  Check,
  WifiOff,
} from 'lucide-react';
import { useJob } from '../hooks/useJob';
import type { DisplayJobDetail } from '../hooks/useJob';
import { jobsData } from '../data/jobsData';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin: string;
  coverLetter: string;
  consent: boolean;
}

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch job from API with fallback
  const { job, isLoading, error, isUsingFallback } = useJob(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    coverLetter: '',
    consent: false,
  });

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Get similar jobs from static data for now
  const similarJobs = job
    ? jobsData
      .filter(
        (j: any) => String(j.id) !== job.id && (j.industry === job.department)
      )
      .slice(0, 3)
    : [];

  const formatSalary = (salary: { min: number; max: number; currency: string; period?: string }) => {
    if (!salary.min || !salary.max) return 'Salary Not Disclosed';
    if (salary.period === 'hourly') {
      return `$${salary.min} - $${salary.max} /hr`;
    }
    return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()} ${salary.currency}/yr`;
  };

  const formatSalaryShort = (salary: { min: number; max: number; period?: string }) => {
    if (!salary.min || !salary.max) return 'Salary TBD';
    if (salary.period === 'hourly') {
      return `$${salary.min} - $${salary.max}/hr`;
    }
    return `$${(salary.min / 1000).toFixed(0)}K - $${(salary.max / 1000).toFixed(0)}K`;
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!uploadedFile) {
    alert('Please upload your resume');
    return;
  }

  setIsSubmitting(true);

  try {
    const applicationData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      linkedIn: formData.linkedin,
      coverLetter: formData.coverLetter,

      //  REQUIRED FOR JOB EMAIL
      jobTitle: job.title,            // MUST exist
      jobCompany: job.company,        // optional
      jobLocation: `${job.city}, ${job.state}`, // optional
    };

    console.log(' JOB APPLICATION DATA:', applicationData);

    await submitJobApplication(applicationData, uploadedFile);

    setIsSubmitted(true);

    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        linkedin: '',
        coverLetter: '',
        consent: false,
      });
      setUploadedFile(null);
    }, 3000);
  } catch (error) {
    console.error('❌Job application failed:', error);
    alert('Failed to submit application. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};


  const handleShare = (platform: string) => {
    if (!job) return;
    const url = window.location.href;
    const title = `${job.title} at ${job.company}`;
    const shareUrls: Record<string, string> = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this job: ${url}`)}`,
    };
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading job details...</p>
        </motion.div>
      </div>
    );
  }

  // Not Found State
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={48} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Job Not Found</h2>
          <p className="text-gray-600 mb-8">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 hover:shadow-emerald-600/40 transition-all duration-300"
          >
            <ArrowLeft size={20} />
            Browse All Jobs
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-emerald-50 to-transparent" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl" />
        <div className="absolute top-3/4 -right-32 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl" />
      </div>

      {/* Sticky Header */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate('/jobs')}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 border border-gray-200 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div>
                    <h3 className="text-gray-900 font-semibold">{job.title}</h3>
                    <p className="text-gray-500 text-sm">
                      {job.company} • {job.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden sm:block text-emerald-600 font-semibold">
                    {formatSalaryShort(job.salary)}/yr
                  </span>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 transition-all duration-300"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 md:pt-40 md:pb-12 overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            className="flex items-center gap-2 text-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link to="/" className="text-gray-500 hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <Link to="/jobs" className="text-gray-500 hover:text-emerald-600 transition-colors">
              Jobs
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-gray-700 font-medium">{job.title}</span>
          </motion.nav>

          {/* Job Header Card */}
          <motion.div
            className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-xl shadow-gray-200/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              {/* Left Section */}
              <div className="flex flex-col sm:flex-row items-start gap-5">
                {/* Company Logo */}
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl md:text-3xl flex-shrink-0 shadow-lg shadow-emerald-500/25">
                  {job.company.charAt(0)}
                </div>

                <div className="flex-1">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {job.isFeatured && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-medium">
                        <Star size={12} />
                        Featured
                      </span>
                    )}
                    {job.isUrgent && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full text-xs font-medium">
                        <Zap size={12} />
                        Urgent Hiring
                      </span>
                    )}
                    <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-medium">
                      {job.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                    {job.title}
                  </h1>

                  {/* Company & Location */}
                  <div className="flex flex-wrap items-center gap-4 text-gray-600">
                    <span className="flex items-center gap-2">
                      <Building2 size={18} className="text-emerald-600" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={18} className="text-emerald-600" />
                      {job.location}, {job.country}
                    </span>
                  </div>

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <DollarSign size={18} className="text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Salary</p>
                        <p className="text-gray-900 font-semibold text-sm">
                          {formatSalaryShort(job.salary)}/yr
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Clock size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Experience</p>
                        <p className="text-gray-900 font-semibold text-sm">{job.experience}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Calendar size={18} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Posted</p>
                        <p className="text-gray-900 font-semibold text-sm">
                          {formatDate(job.publishedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="flex flex-col items-stretch sm:items-end gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 hover:shadow-emerald-600/40 transition-all duration-300 active:scale-95"
                >
                  Apply for this Position
                  <ArrowLeft size={20} className="rotate-180" />
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`w-12 h-12 flex items-center justify-center rounded-xl border transition-all duration-300 ${isSaved
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                      : 'bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <Bookmark size={20} fill={isSaved ? 'currentColor' : 'none'} />
                  </button>

                  {/* Share Button with Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="w-12 h-12 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-300"
                    >
                      <Share2 size={20} />
                    </button>

                    <AnimatePresence>
                      {showShareMenu && (
                        <motion.div
                          className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <button
                            onClick={() => handleShare('linkedin')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Linkedin size={18} className="text-[#0077b5]" />
                            LinkedIn
                          </button>
                          <button
                            onClick={() => handleShare('twitter')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Twitter size={18} className="text-[#1da1f2]" />
                            Twitter
                          </button>
                          <button
                            onClick={() => handleShare('facebook')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Facebook size={18} className="text-[#4267B2]" />
                            Facebook
                          </button>
                          <button
                            onClick={() => handleShare('email')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Mail size={18} className="text-emerald-600" />
                            Email
                          </button>
                          <div className="border-t border-gray-100">
                            <button
                              onClick={copyToClipboard}
                              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              {copied ? (
                                <>
                                  <Check size={18} className="text-emerald-600" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy size={18} />
                                  Copy Link
                                </>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Column */}
            <div className="flex-1">
              {/* Tabs */}
              <motion.div
                className="bg-white border border-gray-200 rounded-xl p-1.5 mb-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex gap-1">
                  {['description', 'requirements', 'benefits'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${activeTab === tab
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Tab Content */}
              <motion.div
                className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <AnimatePresence mode="wait">
                  {activeTab === 'description' && (
                    <motion.div
                      key="description"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className="prose prose-gray max-w-none
                          prose-headings:text-gray-900 prose-headings:font-semibold
                          prose-p:text-gray-600 prose-p:leading-relaxed
                          prose-li:text-gray-600
                          prose-strong:text-gray-900
                          prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline"
                        dangerouslySetInnerHTML={{ __html: job.fullDescription }}
                      />
                    </motion.div>
                  )}

                  {activeTab === 'requirements' && (
                    <motion.div
                      key="requirements"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Key Requirements</h3>
                      <ul className="space-y-4 mb-8">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle
                              size={20}
                              className="text-emerald-600 flex-shrink-0 mt-0.5"
                            />
                            <span className="text-gray-600">{req}</span>
                          </li>
                        ))}
                      </ul>

                      <h3 className="text-xl font-bold text-gray-900 mb-6">Skills & Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'benefits' && (
                    <motion.div
                      key="benefits"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-6">What We Offer</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {job.benefits.map((benefit, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 transition-colors group"
                          >
                            <div className="w-10 h-10 bg-emerald-100 group-hover:bg-emerald-200 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                              <Award size={20} className="text-emerald-600" />
                            </div>
                            <span className="text-gray-700 font-medium">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80 xl:w-96 space-y-6">
              {/* Job Overview Card */}
              <motion.div
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-5">Job Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar size={18} className="text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-500 text-xs">Date Posted</p>
                      <p className="text-gray-900 font-medium truncate">
                        {formatDate(job.publishedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock size={18} className="text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-500 text-xs">Closing Date</p>
                      <p className="text-gray-900 font-medium truncate">
                        {job.applicationDeadline ? formatDate(job.applicationDeadline) : 'Open Until Filled'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase size={18} className="text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-500 text-xs">Job Type</p>
                      <p className="text-gray-900 font-medium truncate">{job.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users size={18} className="text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-500 text-xs">Experience</p>
                      <p className="text-gray-900 font-medium truncate">{job.experience}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-500 text-xs">Location</p>
                      <p className="text-gray-900 font-medium truncate">
                        {job.city}, {job.state}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign size={18} className="text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-500 text-xs">Salary Range</p>
                      <p className="text-emerald-600 font-semibold truncate">
                        {formatSalary(job.salary)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Share Card */}
              <motion.div
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-5">Share This Job</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex-1 h-12 flex items-center justify-center bg-[#0077b5]/10 hover:bg-[#0077b5]/20 border border-[#0077b5]/20 rounded-xl text-[#0077b5] transition-colors"
                  >
                    <Linkedin size={20} />
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex-1 h-12 flex items-center justify-center bg-[#1da1f2]/10 hover:bg-[#1da1f2]/20 border border-[#1da1f2]/20 rounded-xl text-[#1da1f2] transition-colors"
                  >
                    <Twitter size={20} />
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex-1 h-12 flex items-center justify-center bg-[#4267B2]/10 hover:bg-[#4267B2]/20 border border-[#4267B2]/20 rounded-xl text-[#4267B2] transition-colors"
                  >
                    <Facebook size={20} />
                  </button>
                  <button
                    onClick={() => handleShare('email')}
                    className="flex-1 h-12 flex items-center justify-center bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-emerald-600 transition-colors"
                  >
                    <Mail size={20} />
                  </button>
                </div>
              </motion.div>

              {/* Apply Card */}
              <motion.div
                className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">Interested in this job?</h3>
                <p className="text-gray-600 text-sm mb-5">
                  Don't let this opportunity pass you by. Apply today!
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 hover:shadow-emerald-600/40 transition-all duration-300 active:scale-95"
                >
                  Apply Now
                  <Send size={18} />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Jobs Section */}
      {similarJobs.length > 0 && (
        <section className="relative z-10 py-12 md:py-16 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                Similar Opportunities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarJobs.map((similarJob, index) => (
                  <motion.div
                    key={similarJob.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <Link
                      to={`/jobs/${similarJob.id}`}
                      className="group block bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:bg-white hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
                          {similarJob.company.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-gray-900 font-semibold truncate group-hover:text-emerald-600 transition-colors">
                            {similarJob.title}
                          </h4>
                          <p className="text-gray-500 text-sm truncate">{similarJob.company}</p>
                        </div>
                        <ExternalLink
                          size={18}
                          className="text-gray-400 group-hover:text-emerald-600 transition-colors flex-shrink-0"
                        />
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {similarJob.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={14} className="text-emerald-600" />
                          <span className="text-emerald-600 font-medium">
                            {formatSalaryShort(similarJob.salary)}
                          </span>
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Application Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-2xl max-h-[90vh] bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Apply for {job.title}</h2>
                    <p className="text-gray-500 text-sm mt-1">
                      {job.company} • {job.location}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
                {isSubmitted ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h3>
                    <p className="text-gray-600">
                      Thank you for applying. We'll review your application and get back to you
                      soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Contact Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* LinkedIn */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        LinkedIn Profile (Optional)
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/yourprofile"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Resume/CV *
                      </label>
                      <div
                        onClick={() => document.getElementById('resume')?.click()}
                        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${uploadedFile
                          ? 'border-emerald-400 bg-emerald-50'
                          : 'border-gray-300 hover:border-emerald-400 hover:bg-gray-50'
                          }`}
                      >
                        <input
                          type="file"
                          id="resume"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          hidden
                        />
                        {uploadedFile ? (
                          <div className="flex items-center justify-center gap-3">
                            <FileText size={24} className="text-emerald-600" />
                            <span className="text-gray-900 font-medium">{uploadedFile.name}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setUploadedFile(null);
                              }}
                              className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-red-100 rounded-lg text-gray-500 hover:text-red-600 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                            <p className="text-gray-700 font-medium mb-1">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-gray-500 text-sm">PDF, DOC, DOCX (max 5MB)</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Cover Letter */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Cover Letter (Optional)
                      </label>
                      <textarea
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Tell us why you're interested in this position..."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                      />
                    </div>

                    {/* Consent Checkbox */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleInputChange}
                        required
                        className="mt-1 w-4 h-4 rounded border-gray-300 bg-white text-emerald-600 focus:ring-emerald-500 focus:ring-2 cursor-pointer"
                      />
                      <label htmlFor="consent" className="text-gray-600 text-sm cursor-pointer">
                        I agree to the processing of my personal data for recruitment purposes.
                      </label>
                    </div>

                    {/* Form Actions */}
                    <div className="flex flex-col-reverse sm:flex-row items-center gap-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="w-full sm:w-auto px-6 py-3 bg-gray-100 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 hover:shadow-emerald-600/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Application
                            <Send size={18} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close share menu */}
      {showShareMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)} />
      )}
    </div>
  );
};

export default JobDetailPage;