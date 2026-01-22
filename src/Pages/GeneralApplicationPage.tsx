import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Upload,
  FileText,
  X,
  CheckCircle,
  Send,
  Briefcase,
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Clock,
  Zap,
  ArrowLeft,
  Heart,
  Sparkles,
  Shield,
  Users,
  Award,
  AlertCircle,
} from 'lucide-react';
import { submitGeneralApplication } from '../api/applications.api';

const GeneralApplicationPage = () => {
  const [uploadedResume, setUploadedResume] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    // Professional Info
    preferredRole: '',
    experience: '',
    availability: '',
    salaryExpectation: '',
    willingToRelocate: '',
    // Additional
    skills: '',
    certifications: '',
    coverLetter: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const roleOptions = [
    { value: 'cnc-operator', label: 'CNC Machine Operator' },
    { value: 'industrial-electrician', label: 'Industrial Electrician' },
    { value: 'maintenance-technician', label: 'Maintenance Technician' },
    { value: 'millwright', label: 'Millwright' },
    { value: 'hvac-technician', label: 'HVAC Technician' },
    { value: 'plc-technician', label: 'PLC Technician' },
    { value: 'welder-fabricator', label: 'Welder/Fabricator' },
    { value: 'heavy-equipment', label: 'Heavy Equipment Operator' },
    { value: 'field-service', label: 'Field Service Technician' },
    { value: 'robotics-technician', label: 'Robotics Technician' },
    { value: 'controls-engineer', label: 'Controls Engineer' },
    { value: 'production-supervisor', label: 'Production Supervisor' },
    { value: 'quality-inspector', label: 'Quality Inspector' },
    { value: 'other', label: 'Other Technical Role' },
  ];

  const experienceOptions = [
    { value: '0-1', label: 'Less than 1 year' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10+', label: '10+ years' },
  ];

  const availabilityOptions = [
    { value: 'immediately', label: 'Immediately' },
    { value: '1-week', label: '1 week notice' },
    { value: '2-weeks', label: '2 weeks notice' },
    { value: '1-month', label: '1 month notice' },
    { value: '2-months', label: '2+ months notice' },
  ];

  const salaryOptions = [
    { value: '40-50k', label: '$40,000 - $50,000' },
    { value: '50-60k', label: '$50,000 - $60,000' },
    { value: '60-70k', label: '$60,000 - $70,000' },
    { value: '70-80k', label: '$70,000 - $80,000' },
    { value: '80-90k', label: '$80,000 - $90,000' },
    { value: '90-100k', label: '$90,000 - $100,000' },
    { value: '100k+', label: '$100,000+' },
    { value: 'negotiable', label: 'Negotiable' },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF or Word document');
        return;
      }
      setUploadedResume(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone && formData.location;
      case 2:
        return formData.preferredRole && formData.experience && formData.availability && uploadedResume;
      case 3:
        return formData.consent;
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(3) || !uploadedResume) {
      alert('Please complete all required fields and accept the terms');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare application data for general application (no specific job)
      const applicationData = {
  firstName: formData.firstName,
  lastName: formData.lastName,
  email: formData.email,
  phone: formData.phone,
  location: formData.location,
  linkedIn: formData.linkedin,

  preferredRole: formData.preferredRole,
  experience: formData.experience,
  availability: formData.availability,
  expectedSalary: formData.salaryExpectation,
  willingToRelocate: formData.willingToRelocate,
  skills: formData.skills,
  coverLetter: formData.coverLetter,

  consent: true, // 🔴 THIS FIXES EVERYTHING
};


      await submitGeneralApplication(applicationData, uploadedResume);

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

  // Success State
  if (isSubmitted) {
    return (
      <div className="general-app-page">
        <div className="general-app-container">
          <motion.div
            className="success-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="success-icon-wrapper">
              <motion.div
                className="success-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <CheckCircle size={60} />
              </motion.div>
              <motion.div
                className="success-rings"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Application Submitted Successfully!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Thank you for joining our talent network, <strong>{formData.firstName}</strong>!
              Our recruitment team will review your profile and reach out when we have
              opportunities matching your skills and preferences.
            </motion.p>

            <motion.div
              className="success-info-cards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="info-card">
                <Mail size={24} />
                <div>
                  <h4>Check Your Email</h4>
                  <p>We've sent a confirmation to {formData.email}</p>
                </div>
              </div>
              <div className="info-card">
                <Clock size={24} />
                <div>
                  <h4>What's Next?</h4>
                  <p>Our team typically responds within 5-7 business days</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="success-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/jobs" className="btn btn-primary btn-large">
                Browse Current Openings
              </Link>
              <Link to="/" className="btn btn-secondary">
                Return to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="general-app-page">
      {/* Hero Section */}
      <section className="general-app-hero">
        <div className="hero-bg-pattern" />
        <div className="hero-gradient" />

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/jobs" className="back-link">
              <ArrowLeft size={20} />
              Back to Jobs
            </Link>

            <div className="hero-badge">
              <Sparkles size={16} />
              Join Our Talent Network
            </div>

            <h1>General Job Application</h1>
            <p>
              Don't see a position that matches your skills? Submit your profile to
              our talent pool and we'll contact you when relevant opportunities arise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="general-app-content">
        <div className="general-app-container">
          <div className="app-layout">
            {/* Form Section */}
            <div className="form-section">
              {/* Progress Steps */}
              <div className="progress-steps">
                <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                  <div className="step-number">
                    {currentStep > 1 ? <CheckCircle size={20} /> : '1'}
                  </div>
                  <div className="step-info">
                    <span className="step-title">Personal Info</span>
                    <span className="step-desc">Your contact details</span>
                  </div>
                </div>

                <div className="step-connector" />

                <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                  <div className="step-number">
                    {currentStep > 2 ? <CheckCircle size={20} /> : '2'}
                  </div>
                  <div className="step-info">
                    <span className="step-title">Professional</span>
                    <span className="step-desc">Experience & Resume</span>
                  </div>
                </div>

                <div className="step-connector" />

                <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                  <div className="step-number">3</div>
                  <div className="step-info">
                    <span className="step-title">Review</span>
                    <span className="step-desc">Submit application</span>
                  </div>
                </div>
              </div>

              {/* Form Card */}
              <motion.div
                className="form-card"
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="form-step">
                      <div className="form-step-header">
                        <div className="step-icon">
                          <User size={24} />
                        </div>
                        <div>
                          <h2>Personal Information</h2>
                          <p>Tell us about yourself so we can reach you</p>
                        </div>
                      </div>

                      <div className="form-grid">
                        <div className="form-group">
                          <label htmlFor="firstName">
                            First Name <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="John"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="lastName">
                            Last Name <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-grid">
                        <div className="form-group">
                          <label htmlFor="email">
                            Email Address <span className="required">*</span>
                          </label>
                          <div className="input-with-icon">
                            <Mail size={18} />
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="john.doe@email.com"
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
  <label htmlFor="phone">
    Phone Number <span className="required">*</span>
  </label>
  <div className="input-with-icon">
    <Phone size={18} />
    <input
      type="tel"
      id="phone"
      name="phone"
      value={formData.phone}
      onChange={handleInputChange}
      placeholder="+1 555 123 4567"
      required
    />
  </div>
</div>

                      </div>

                      <div className="form-group">
                        <label htmlFor="location">
                          Current Location <span className="required">*</span>
                        </label>
                        <div className="input-with-icon">
                          <MapPin size={18} />
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="City, Province/State, Country"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="linkedin">
                          LinkedIn Profile <span className="optional">(Optional)</span>
                        </label>
                        <div className="input-with-icon">
                          <Linkedin size={18} />
                          <input
                            type="url"
                            id="linkedin"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            placeholder="https://linkedin.com/in/yourprofile"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Professional Information */}
                  {currentStep === 2 && (
                    <div className="form-step">
                      <div className="form-step-header">
                        <div className="step-icon">
                          <Briefcase size={24} />
                        </div>
                        <div>
                          <h2>Professional Information</h2>
                          <p>Tell us about your experience and what you're looking for</p>
                        </div>
                      </div>

                      <div className="form-grid">
                        <div className="form-group">
                          <label htmlFor="preferredRole">
                            Preferred Role <span className="required">*</span>
                          </label>
                          <select
                            id="preferredRole"
                            name="preferredRole"
                            value={formData.preferredRole}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select a role type</option>
                            {roleOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group">
                          <label htmlFor="experience">
                            Years of Experience <span className="required">*</span>
                          </label>
                          <select
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select experience level</option>
                            {experienceOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="form-grid">
                        <div className="form-group">
                          <label htmlFor="availability">
                            Availability <span className="required">*</span>
                          </label>
                          <select
                            id="availability"
                            name="availability"
                            value={formData.availability}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">When can you start?</option>
                            {availabilityOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group">
                          <label htmlFor="salaryExpectation">
                            Salary Expectation <span className="optional">(Optional)</span>
                          </label>
                          <select
                            id="salaryExpectation"
                            name="salaryExpectation"
                            value={formData.salaryExpectation}
                            onChange={handleInputChange}
                          >
                            <option value="">Select salary range</option>
                            {salaryOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="willingToRelocate">
                          Willing to Relocate?
                        </label>
                        <div className="radio-group">
                          <label className="radio-option">
                            <input
                              type="radio"
                              name="willingToRelocate"
                              value="yes"
                              checked={formData.willingToRelocate === 'yes'}
                              onChange={handleInputChange}
                            />
                            <span className="radio-checkmark" />
                            Yes
                          </label>
                          <label className="radio-option">
                            <input
                              type="radio"
                              name="willingToRelocate"
                              value="no"
                              checked={formData.willingToRelocate === 'no'}
                              onChange={handleInputChange}
                            />
                            <span className="radio-checkmark" />
                            No
                          </label>
                          <label className="radio-option">
                            <input
                              type="radio"
                              name="willingToRelocate"
                              value="depends"
                              checked={formData.willingToRelocate === 'depends'}
                              onChange={handleInputChange}
                            />
                            <span className="radio-checkmark" />
                            Depends on location
                          </label>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>
                          Resume/CV <span className="required">*</span>
                        </label>
                        <div
                          className={`file-dropzone ${uploadedResume ? 'has-file' : ''}`}
                          onClick={() => document.getElementById('resume-upload').click()}
                        >
                          <input
                            type="file"
                            id="resume-upload"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileUpload}
                            hidden
                          />

                          {uploadedResume ? (
                            <div className="file-preview">
                              <div className="file-icon">
                                <FileText size={28} />
                              </div>
                              <div className="file-info">
                                <span className="file-name">{uploadedResume.name}</span>
                                <span className="file-size">
                                  {(uploadedResume.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                              </div>
                              <button
                                type="button"
                                className="file-remove"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setUploadedResume(null);
                                }}
                              >
                                <X size={18} />
                              </button>
                            </div>
                          ) : (
                            <div className="dropzone-content">
                              <div className="dropzone-icon">
                                <Upload size={32} />
                              </div>
                              <p>Click to upload or drag and drop</p>
                              <span>PDF, DOC, DOCX (max 5MB)</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="skills">
                          Key Skills & Certifications <span className="optional">(Optional)</span>
                        </label>
                        <textarea
                          id="skills"
                          name="skills"
                          value={formData.skills}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="e.g., Red Seal Electrician, PLC Programming (Allen Bradley), CNC Operation, Welding CWB..."
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Review & Submit */}
                  {currentStep === 3 && (
                    <div className="form-step">
                      <div className="form-step-header">
                        <div className="step-icon">
                          <CheckCircle size={24} />
                        </div>
                        <div>
                          <h2>Review Your Application</h2>
                          <p>Please review your information before submitting</p>
                        </div>
                      </div>

                      {/* Review Summary */}
                      <div className="review-summary">
                        <div className="review-section">
                          <h3>
                            <User size={18} />
                            Personal Information
                          </h3>
                          <div className="review-grid">
                            <div className="review-item">
                              <span className="review-label">Name</span>
                              <span className="review-value">{formData.firstName} {formData.lastName}</span>
                            </div>
                            <div className="review-item">
                              <span className="review-label">Email</span>
                              <span className="review-value">{formData.email}</span>
                            </div>
                            <div className="review-item">
                              <span className="review-label">Phone</span>
                              <span className="review-value">{formData.phone}</span>
                            </div>
                            <div className="review-item">
                              <span className="review-label">Location</span>
                              <span className="review-value">{formData.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="review-section">
                          <h3>
                            <Briefcase size={18} />
                            Professional Information
                          </h3>
                          <div className="review-grid">
                            <div className="review-item">
                              <span className="review-label">Preferred Role</span>
                              <span className="review-value">
                                {roleOptions.find(r => r.value === formData.preferredRole)?.label || '-'}
                              </span>
                            </div>
                            <div className="review-item">
                              <span className="review-label">Experience</span>
                              <span className="review-value">
                                {experienceOptions.find(e => e.value === formData.experience)?.label || '-'}
                              </span>
                            </div>
                            <div className="review-item">
                              <span className="review-label">Availability</span>
                              <span className="review-value">
                                {availabilityOptions.find(a => a.value === formData.availability)?.label || '-'}
                              </span>
                            </div>
                            <div className="review-item">
                              <span className="review-label">Resume</span>
                              <span className="review-value">{uploadedResume?.name || '-'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Cover Letter */}
                      <div className="form-group">
                        <label htmlFor="coverLetter">
                          Additional Information <span className="optional">(Optional)</span>
                        </label>
                        <textarea
                          id="coverLetter"
                          name="coverLetter"
                          value={formData.coverLetter}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Anything else you'd like us to know? Career goals, specific interests, etc."
                        />
                      </div>

                      {/* Consent */}
                      <div className="consent-section">
                        <label className="checkbox-option">
                          <input
                            type="checkbox"
                            name="consent"
                            checked={formData.consent}
                            onChange={handleInputChange}
                            required
                          />
                          <span className="checkbox-checkmark" />
                          <span className="checkbox-label">
                            I consent to TalentConnectors storing and processing my personal data for recruitment purposes.
                            I understand that my information will be handled in accordance with the
                            <a href="/privacy">Privacy Policy</a> and
                            <a href="/TermsOfService">Terms & Conditions</a>.
                            I acknowledge that my data will be used solely for recruitment-related activities and will not be
                            shared with third parties without my explicit consent, except where required by law.

                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Form Actions */}
                  <div className="form-actions">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handlePrevStep}
                      >
                        <ArrowLeft size={18} />
                        Previous
                      </button>
                    )}

                    {currentStep < 3 ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleNextStep}
                        disabled={!validateStep(currentStep)}
                      >
                        Continue
                        <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary btn-submit"
                        disabled={isSubmitting || !formData.consent}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="btn-spinner" />
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

            {/* Sidebar */}
            <aside className="app-sidebar">
              {/* Why Join Card */}
              <div className="sidebar-card why-join-card">
                <h3>Why Join Our Network?</h3>
                <ul className="benefits-list">
                  <li>
                    <div className="benefit-icon">
                      <Users size={20} />
                    </div>
                    <div>
                      <strong>Access to 500+ Companies</strong>
                      <p>Connect with top employers across North America</p>
                    </div>
                  </li>
                  <li>
                    <div className="benefit-icon">
                      <Award size={20} />
                    </div>
                    <div>
                      <strong>Priority Consideration</strong>
                      <p>Be first in line when matching jobs open</p>
                    </div>
                  </li>
                  <li>
                    <div className="benefit-icon">
                      <Shield size={20} />
                    </div>
                    <div>
                      <strong>Free & Confidential</strong>
                      <p>We never charge candidates, ever</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Stats Card - Icon Based */}
              <div className="sidebar-card stats-card icon-based">
                <div className="stat-item">
                  <div className="stat-icon">
                    <Zap size={24} />
                  </div>
                  <span className="stat-label">Fast Response Time</span>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <Shield size={24} />
                  </div>
                  <span className="stat-label">100% Confidential</span>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <Heart size={24} />
                  </div>
                  <span className="stat-label">Free for Candidates</span>
                </div>
              </div>

              {/* Contact Card */}
              <div className="sidebar-card contact-card">
                <h3>Have Questions?</h3>
                <p>Our recruitment team is here to help</p>
                <a href="mailto:careers@talentconnectors.com" className="contact-link">
                  <Mail size={18} />
                  careers@talentconnectors.com
                </a>


              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GeneralApplicationPage;