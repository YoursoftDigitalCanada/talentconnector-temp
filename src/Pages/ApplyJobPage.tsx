// src/pages/ApplyJobPage.tsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Upload,
  X,
  FileText,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  User,
  Mail,
  Phone,
  Linkedin,
  FileCheck,
  Shield,
  WifiOff,
} from 'lucide-react';
import { useJob } from '../hooks/useJob';
import { submitJobApplication } from '../api/applications.api';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  currentCompany: string;
  currentTitle: string;
  yearsOfExperience: string;
  expectedSalary: string;
  noticePeriod: string;
  coverLetter: string;
  heardAboutUs: string;
  consent: boolean;
  marketingConsent: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  resume?: string;
  consent?: string;
}

const ApplyJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch job from API with fallback
  const { job, isLoading, error: jobError, isUsingFallback } = useJob(id);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    currentCompany: '',
    currentTitle: '',
    yearsOfExperience: '',
    expectedSalary: '',
    noticePeriod: '',
    coverLetter: '',
    heardAboutUs: '',
    consent: false,
    marketingConsent: false,
  });

  const totalSteps = 3;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const formatSalaryShort = (salary: { min: number; max: number; period?: string }) => {
    if (!salary.min || !salary.max) return 'TBD';
    if (salary.period === 'hourly') {
      return `$${salary.min} - $${salary.max}/hr`;
    }
    return `$${(salary.min / 1000).toFixed(0)}K - $${(salary.max / 1000).toFixed(0)}K`;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const processFile = (file: File | undefined) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, resume: 'File size must be less than 5MB' }));
        return;
      }
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, resume: 'Please upload a PDF or Word document' }));
        return;
      }
      setUploadedFile(file);
      setErrors((prev) => ({ ...prev, resume: undefined }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      }
    }

    if (step === 2) {
      if (!uploadedFile) newErrors.resume = 'Please upload your resume';
    }

    if (step === 3) {
      if (!formData.consent) newErrors.consent = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
    if (!uploadedFile || !job) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare application data matching server API
      const applicationData = {
        jobId: job.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        linkedIn: formData.linkedin,
        portfolio: formData.portfolio,
        currentCompany: formData.currentCompany,
        currentTitle: formData.currentTitle,
        coverLetter: formData.coverLetter,
        expectedSalary: formData.expectedSalary,
        noticePeriod: formData.noticePeriod,
        experienceYears: formData.yearsOfExperience ? parseInt(formData.yearsOfExperience.split('-')[0]) : 0,
        source: formData.heardAboutUs || 'website',
      };

      await submitJobApplication(applicationData, uploadedFile);

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      console.error('Application submission failed:', error);
      const errorMessage = error.response?.data?.message || 'Failed to submit application. Please try again.';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
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
          <p className="text-gray-600">Loading application form...</p>
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
            The job you're trying to apply for doesn't exist or has been removed.
          </p>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 transition-all duration-300"
          >
            <ArrowLeft size={20} />
            Browse All Jobs
          </Link>
        </motion.div>
      </div>
    );
  }

  // Success State
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Background Elements */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-emerald-50 to-transparent" />
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl" />
          <div className="absolute top-3/4 -right-32 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
          <motion.div
            className="max-w-lg w-full text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-xl">
              {/* Success Animation */}
              <motion.div
                className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <CheckCircle size={48} className="text-emerald-600" />
                </motion.div>
              </motion.div>

              <motion.h1
                className="text-3xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Application Submitted!
              </motion.h1>

              <motion.p
                className="text-gray-600 mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Thank you for applying for the position of{' '}
                <span className="font-semibold text-gray-900">{job.title}</span> at{' '}
                <span className="font-semibold text-gray-900">{job.company}</span>.
              </motion.p>

              <motion.div
                className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-emerald-700 text-sm">
                  We've sent a confirmation email to{' '}
                  <span className="font-semibold">{formData.email}</span>. Our team will review
                  your application and get back to you within 5-7 business days.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  to="/jobs"
                  className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 transition-all duration-300"
                >
                  Browse More Jobs
                </Link>
                <Link
                  to="/"
                  className="px-6 py-3 bg-gray-100 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
                >
                  Back to Home
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
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

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 border border-gray-200 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-gray-900 font-semibold">Apply for Position</h1>
                <p className="text-gray-500 text-sm">{job.title} at {job.company}</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <span>Step {currentStep} of {totalSteps}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 py-8 md:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form Column */}
            <div className="lg:col-span-2">
              {/* Progress Bar */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-3">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${step < currentStep
                          ? 'bg-emerald-600 text-white'
                          : step === currentStep
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                            : 'bg-gray-200 text-gray-500'
                          }`}
                      >
                        {step < currentStep ? <CheckCircle size={20} /> : step}
                      </div>
                      {step < 3 && (
                        <div
                          className={`w-full h-1 mx-2 rounded-full transition-all duration-300 ${step < currentStep ? 'bg-emerald-600' : 'bg-gray-200'
                            }`}
                          style={{ width: '80px' }}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Personal Info</span>
                  <span>Resume & Details</span>
                  <span>Review & Submit</span>
                </div>
              </motion.div>

              {/* Form Card */}
              <motion.div
                className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                          <User size={20} className="text-emerald-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                          <p className="text-gray-500 text-sm">Tell us about yourself</p>
                        </div>
                      </div>

                      <div className="space-y-5">
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                              First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.firstName
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                                : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20'
                                }`}
                              placeholder="John"
                            />
                            {errors.firstName && (
                              <p className="mt-1 text-red-500 text-sm">{errors.firstName}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                              Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.lastName
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                                : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20'
                                }`}
                              placeholder="Doe"
                            />
                            {errors.lastName && (
                              <p className="mt-1 text-red-500 text-sm">{errors.lastName}</p>
                            )}
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            <Mail size={14} className="inline mr-1" />
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.email
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                              : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20'
                              }`}
                            placeholder="john.doe@example.com"
                          />
                          {errors.email && (
                            <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            <Phone size={14} className="inline mr-1" />
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.phone
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                              : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20'
                              }`}
                            placeholder="+1 (555) 123-4567"
                          />
                          {errors.phone && (
                            <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>
                          )}
                        </div>

                        {/* LinkedIn */}
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            <Linkedin size={14} className="inline mr-1" />
                            LinkedIn Profile <span className="text-gray-400">(Optional)</span>
                          </label>
                          <input
                            type="url"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                            placeholder="https://linkedin.com/in/johndoe"
                          />
                        </div>

                        {/* Portfolio */}
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Portfolio/Website <span className="text-gray-400">(Optional)</span>
                          </label>
                          <input
                            type="url"
                            name="portfolio"
                            value={formData.portfolio}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                            placeholder="https://yourportfolio.com"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Resume & Professional Details */}
                  {currentStep === 2 && (
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                          <FileCheck size={20} className="text-emerald-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">Resume & Experience</h2>
                          <p className="text-gray-500 text-sm">Upload your resume and share your experience</p>
                        </div>
                      </div>

                      <div className="space-y-5">
                        {/* Resume Upload */}
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Resume/CV <span className="text-red-500">*</span>
                          </label>
                          <div
                            onClick={() => document.getElementById('resume')?.click()}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragging
                              ? 'border-emerald-500 bg-emerald-50'
                              : uploadedFile
                                ? 'border-emerald-400 bg-emerald-50'
                                : errors.resume
                                  ? 'border-red-300 bg-red-50'
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
                              <div className="flex flex-col items-center">
                                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-3">
                                  <FileText size={28} className="text-emerald-600" />
                                </div>
                                <p className="text-gray-900 font-medium mb-1">{uploadedFile.name}</p>
                                <p className="text-gray-500 text-sm mb-3">
                                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setUploadedFile(null);
                                  }}
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-red-100 rounded-lg text-gray-600 hover:text-red-600 text-sm font-medium transition-colors"
                                >
                                  <X size={16} />
                                  Remove File
                                </button>
                              </div>
                            ) : (
                              <div>
                                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                  <Upload size={28} className="text-gray-400" />
                                </div>
                                <p className="text-gray-900 font-medium mb-1">
                                  Drop your resume here or click to browse
                                </p>
                                <p className="text-gray-500 text-sm">
                                  PDF, DOC, or DOCX (Max 5MB)
                                </p>
                              </div>
                            )}
                          </div>
                          {errors.resume && (
                            <p className="mt-2 text-red-500 text-sm">{errors.resume}</p>
                          )}
                        </div>

                        {/* Current Position */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                              Current Company <span className="text-gray-400">(Optional)</span>
                            </label>
                            <input
                              type="text"
                              name="currentCompany"
                              value={formData.currentCompany}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                              placeholder="Company Name"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                              Current Title <span className="text-gray-400">(Optional)</span>
                            </label>
                            <input
                              type="text"
                              name="currentTitle"
                              value={formData.currentTitle}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                              placeholder="Job Title"
                            />
                          </div>
                        </div>

                        {/* Experience & Salary */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                              Years of Experience
                            </label>
                            <select
                              name="yearsOfExperience"
                              value={formData.yearsOfExperience}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                            >
                              <option value="">Select...</option>
                              <option value="0-1">0-1 years</option>
                              <option value="1-3">1-3 years</option>
                              <option value="3-5">3-5 years</option>
                              <option value="5-10">5-10 years</option>
                              <option value="10+">10+ years</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                              Expected Salary <span className="text-gray-400">(Optional)</span>
                            </label>
                            <input
                              type="text"
                              name="expectedSalary"
                              value={formData.expectedSalary}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                              placeholder="e.g., $80,000"
                            />
                          </div>
                        </div>

                        {/* Notice Period */}
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Notice Period / Availability
                          </label>
                          <select
                            name="noticePeriod"
                            value={formData.noticePeriod}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                          >
                            <option value="">Select...</option>
                            <option value="immediately">Immediately</option>
                            <option value="1-week">1 week</option>
                            <option value="2-weeks">2 weeks</option>
                            <option value="1-month">1 month</option>
                            <option value="2-months">2 months</option>
                            <option value="3-months">3+ months</option>
                          </select>
                        </div>

                        {/* Cover Letter */}
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Cover Letter <span className="text-gray-400">(Optional)</span>
                          </label>
                          <textarea
                            name="coverLetter"
                            value={formData.coverLetter}
                            onChange={handleInputChange}
                            rows={5}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                            placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Review & Submit */}
                  {currentStep === 3 && (
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                          <Shield size={20} className="text-emerald-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">Review & Submit</h2>
                          <p className="text-gray-500 text-sm">Please review your application before submitting</p>
                        </div>
                      </div>

                      {/* Application Summary */}
                      <div className="space-y-6">
                        {/* Personal Info Summary */}
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">Personal Information</h3>
                            <button
                              type="button"
                              onClick={() => setCurrentStep(1)}
                              className="text-emerald-600 text-sm font-medium hover:text-emerald-700"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Name</p>
                              <p className="text-gray-900 font-medium">
                                {formData.firstName} {formData.lastName}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Email</p>
                              <p className="text-gray-900 font-medium">{formData.email}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Phone</p>
                              <p className="text-gray-900 font-medium">{formData.phone}</p>
                            </div>
                            {formData.linkedin && (
                              <div>
                                <p className="text-gray-500">LinkedIn</p>
                                <p className="text-gray-900 font-medium truncate">{formData.linkedin}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Resume Summary */}
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">Resume & Experience</h3>
                            <button
                              type="button"
                              onClick={() => setCurrentStep(2)}
                              className="text-emerald-600 text-sm font-medium hover:text-emerald-700"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="space-y-3 text-sm">
                            {uploadedFile && (
                              <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                                <FileText size={20} className="text-emerald-600" />
                                <div>
                                  <p className="text-gray-900 font-medium">{uploadedFile.name}</p>
                                  <p className="text-gray-500 text-xs">
                                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                              {formData.currentCompany && (
                                <div>
                                  <p className="text-gray-500">Current Company</p>
                                  <p className="text-gray-900 font-medium">{formData.currentCompany}</p>
                                </div>
                              )}
                              {formData.yearsOfExperience && (
                                <div>
                                  <p className="text-gray-500">Experience</p>
                                  <p className="text-gray-900 font-medium">{formData.yearsOfExperience} years</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* How did you hear about us */}
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            How did you hear about this position?
                          </label>
                          <select
                            name="heardAboutUs"
                            value={formData.heardAboutUs}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                          >
                            <option value="">Select...</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="indeed">Indeed</option>
                            <option value="google">Google Search</option>
                            <option value="referral">Employee Referral</option>
                            <option value="company-website">Company Website</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        {/* Consent Checkboxes */}
                        <div className="space-y-4 pt-4 border-t border-gray-200">
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              id="consent"
                              name="consent"
                              checked={formData.consent}
                              onChange={handleInputChange}
                              className={`mt-1 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer ${errors.consent ? 'border-red-300' : ''
                                }`}
                            />
                            <label htmlFor="consent" className="text-gray-600 text-sm cursor-pointer">
                              I confirm that the information provided is accurate and I agree to the
                              processing of my personal data for recruitment purposes.{' '}
                              <span className="text-red-500">*</span>
                            </label>
                          </div>
                          {errors.consent && (
                            <p className="text-red-500 text-sm ml-8">{errors.consent}</p>
                          )}

                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              id="marketingConsent"
                              name="marketingConsent"
                              checked={formData.marketingConsent}
                              onChange={handleInputChange}
                              className="mt-1 w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                            />
                            <label htmlFor="marketingConsent" className="text-gray-600 text-sm cursor-pointer">
                              I would like to receive updates about similar job opportunities and
                              career tips from TalentConnectors.
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Form Actions */}
                  <div className="px-6 md:px-8 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <ArrowLeft size={18} />
                        Previous
                      </button>
                    ) : (
                      <div />
                    )}

                    {currentStep < totalSteps ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 transition-all"
                      >
                        Continue
                        <ArrowLeft size={18} className="rotate-180" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                    )}
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Sidebar - Job Summary */}
            <div className="lg:col-span-1">
              <motion.div
                className="sticky top-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Job Card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                    Applying For
                  </h3>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {job.company.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{job.title}</h4>
                      <p className="text-gray-500">{job.company}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="text-gray-600">{job.location}, {job.country}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Briefcase size={16} className="text-gray-400" />
                      <span className="text-gray-600">{job.type}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-gray-600">{job.experience}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <DollarSign size={16} className="text-emerald-600" />
                      <span className="text-emerald-600 font-semibold">
                        {formatSalaryShort(job.salary)}/yr
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/jobs/${job.id}`}
                    className="mt-4 inline-flex items-center gap-1 text-emerald-600 text-sm font-medium hover:text-emerald-700"
                  >
                    View Full Job Description
                    <ArrowLeft size={14} className="rotate-180" />
                  </Link>
                </div>

                {/* Tips Card */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Application Tips</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Tailor your resume to highlight relevant experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Write a personalized cover letter</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Double-check all information before submitting</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplyJobPage;