import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  MapPin,
  Clock,
  Briefcase,
  ArrowRight,
  DollarSign,
  Sparkles,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { jobsData } from '../data/jobsData';

const Jobs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Positions', icon: <Briefcase size={16} /> },
    { id: 'technician', label: 'Technicians', icon: <Zap size={16} /> },
    { id: 'operator', label: 'Operators', icon: <Sparkles size={16} /> },
    { id: 'maintenance', label: 'Maintenance', icon: <Sparkles size={16} /> },
    { id: 'electrical', label: 'Electrical', icon: <Zap size={16} /> },
  ];

  // Get featured jobs for homepage
  const featuredJobs = jobsData
    .filter((job) => activeFilter === 'all' || job.category === activeFilter)
    .slice(0, 6);

  type SalaryRange = {
    min: number;
    max: number;
    currency: string;
    unit: string;
  };

 const formatSalary = (salary: SalaryRange) => {
  if (!salary.min || !salary.max) return 'Salary Not Disclosed';

  if (salary.unit === 'hour') {
    return `$${salary.min} - $${salary.max} /hr`;
  }

  return `$${(salary.min / 1000).toFixed(0)}K - $${(
    salary.max / 1000
  ).toFixed(0)}K /year`;
};


  // Get badge styles based on job status (Light Theme)
  const getBadgeStyles = (job: { urgent?: boolean; featured?: boolean }) => {
    if (job.urgent) {
      return {
        bg: 'bg-red-100',
        text: 'text-red-700',
        border: 'border-red-200',
        icon: <AlertCircle size={12} />,
        label: 'Urgent',
      };
    }
    if (job.featured) {
      return {
        bg: 'bg-amber-100',
        text: 'text-amber-700',
        border: 'border-amber-200',
        icon: <Sparkles size={12} />,
        label: 'Featured',
      };
    }
    return {
      bg: 'bg-emerald-100',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      icon: <Zap size={12} />,
      label: 'New',
    };
  };

  // Get random color for company logo
  const getLogoColor = (index: number) => {
    const colors = [
      'from-emerald-500 to-teal-600',
      'from-blue-500 to-cyan-600',
      'from-purple-500 to-pink-600',
      'from-amber-500 to-orange-600',
      'from-rose-500 to-red-600',
      'from-indigo-500 to-purple-600',
    ];
    return colors[index % colors.length];
  };

  return (
    <section
      id="jobs"
      className="relative py-20 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-emerald-200/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-blue-200/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-3xl" />

        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-200 rounded-full text-emerald-700 text-sm font-medium mb-6">
            <Briefcase size={16} />
            Open Positions
          </span>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight font-heading">
            Featured{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Opportunities
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Explore our latest technical and industrial job openings across Canada
            and the United States. New positions added daily.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Jobs Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {featuredJobs.map((job, index) => {
              const badgeStyles = getBadgeStyles(job);
              const logoColor = getLogoColor(index);

              return (
                <motion.div
                  key={job.id}
                  className="group relative bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1"
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    {/* Company Info */}
                    <div className="flex items-center gap-3">
                      {/* Company Logo */}
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${logoColor} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                      >
                        {job.company.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-semibold text-sm">
                          {job.company}
                        </h4>
                        <p className="text-gray-500 text-xs">{job.type}</p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${badgeStyles.bg} ${badgeStyles.text} border ${badgeStyles.border} rounded-full text-xs font-medium`}
                    >
                      {badgeStyles.icon}
                      {badgeStyles.label}
                    </span>
                  </div>

                  {/* Job Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                    {job.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-600 text-xs">
                      <MapPin size={12} className="text-emerald-600" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-600 text-xs">
                      <Clock size={12} className="text-blue-600" />
                      {job.shift}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                    {job.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    {/* Salary */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <DollarSign size={16} className="text-emerald-600" />
                      </div>
                      <div>
                        <span className="text-gray-900 font-semibold text-sm">
                          {formatSalary(job.salary)}
                        </span>
                      
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Link
                      to={`/jobs/${job.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg shadow-md shadow-emerald-600/20 hover:bg-emerald-700 hover:shadow-emerald-600/40 transition-all duration-300 active:scale-95"
                    >
                      View Details
                      <ArrowRight size={14} />
                    </Link>
                  </div>

                  {/* Hover Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {featuredJobs.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Briefcase size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500">
              Try adjusting your filters or check back later for new openings.
            </p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Looking for more opportunities?
            </h3>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Browse all our open positions and find the perfect role that matches
              your skills and career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 hover:shadow-emerald-600/40 transition-all duration-300 active:scale-95"
              >
                View All Jobs
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/apply"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 active:scale-95"
              >
                Submit Your Resume
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Jobs;