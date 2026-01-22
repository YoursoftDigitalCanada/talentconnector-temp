// src/pages/JobsPage.tsx
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Filter,
  ChevronDown,
  ChevronUp,
  X,
  Bell,
  SlidersHorizontal,
  AlertCircle,
  Briefcase,
  Clock,
  DollarSign,
  Building2,
  Sparkles,
  Zap,
  ArrowRight,
  Calendar,
  Loader2,
  WifiOff,
} from 'lucide-react';
import { useJobs } from '../hooks/useJobs';
import type { DisplayJob } from '../hooks/useJobs';
import { filterOptions } from '../data/jobsData';

interface SelectedFilters {
  jobTypes: string[];
  industries: string[];
  categories: string[];
  locations: string[];
  cities: string[];
  experience: string[];
}

interface FilterSearches {
  industries: string;
  cities: string;
}

interface ExpandedFilters {
  jobTypes: boolean;
  industries: boolean;
  categories: boolean;
  locations: boolean;
  cities: boolean;
  experience: boolean;
}

const JobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Search states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [locationQuery, setLocationQuery] = useState(searchParams.get('location') || '');

  // Filter states
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    jobTypes: [],
    industries: [],
    categories: [],
    locations: [],
    cities: [],
    experience: [],
  });

  // UI states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState<ExpandedFilters>({
    jobTypes: true,
    industries: true,
    categories: true,
    locations: true,
    cities: false,
    experience: false,
  });
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterSearches, setFilterSearches] = useState<FilterSearches>({
    industries: '',
    cities: '',
  });

  const jobsPerPage = 10;

  // Fetch jobs from API with fallback to static data
  const { jobs: apiJobs, pagination, isLoading, error, isUsingFallback } = useJobs({
    page: currentPage,
    limit: jobsPerPage,
    search: searchQuery || undefined,
    sortBy: sortBy === 'newest' ? 'publishedAt' : sortBy === 'oldest' ? 'publishedAt' : 'title',
    sortOrder: sortBy === 'oldest' || sortBy === 'salary-low' ? 'asc' : 'desc',
  });

  // Filter jobs client-side (for additional filtering when using API)
  const filteredJobs = useMemo(() => {
    let result = [...apiJobs];

    // Location search filter (client-side since API may not support all location filters)
    if (locationQuery) {
      const query = locationQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.location.toLowerCase().includes(query) ||
          job.city.toLowerCase().includes(query) ||
          job.state.toLowerCase().includes(query) ||
          job.country.toLowerCase().includes(query)
      );
    }

    // Job type filter
    if (selectedFilters.jobTypes.length > 0) {
      result = result.filter((job) => selectedFilters.jobTypes.includes(job.type));
    }

    // Industry/Department filter
    if (selectedFilters.industries.length > 0) {
      result = result.filter((job) => selectedFilters.industries.includes(job.department));
    }

    // Location/Province filter
    if (selectedFilters.locations.length > 0) {
      result = result.filter((job) => selectedFilters.locations.includes(job.state));
    }

    // City filter
    if (selectedFilters.cities.length > 0) {
      result = result.filter((job) => selectedFilters.cities.includes(job.city));
    }

    // Experience filter
    if (selectedFilters.experience.length > 0) {
      result = result.filter((job) => selectedFilters.experience.includes(job.experience));
    }

    // Client-side sort (API handles primary sort, this is for fallback)
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
        break;
      case 'salary-high':
        result.sort((a, b) => (b.salary.max || 0) - (a.salary.max || 0));
        break;
      case 'salary-low':
        result.sort((a, b) => (a.salary.min || 0) - (b.salary.min || 0));
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return result;
  }, [apiJobs, locationQuery, selectedFilters, sortBy]);

  // Pagination (use API pagination when available)
  const totalPages = pagination?.pages || Math.ceil(filteredJobs.length / jobsPerPage);
  const totalJobs = pagination?.total || filteredJobs.length;
  // Jobs are already paginated from API, use filteredJobs directly
  const paginatedJobs = filteredJobs;

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (locationQuery) params.set('location', locationQuery);
    setSearchParams(params);
  };

  // Handle filter change
  const handleFilterChange = (filterType: keyof SelectedFilters, value: string) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[filterType];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter((f) => f !== value)
        : [...currentFilters, value];
      return { ...prev, [filterType]: newFilters };
    });
    setCurrentPage(1);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters({
      jobTypes: [],
      industries: [],
      categories: [],
      locations: [],
      cities: [],
      experience: [],
    });
    setSearchQuery('');
    setLocationQuery('');
    setSearchParams({});
    setCurrentPage(1);
  };

  // Remove single filter
  const removeFilter = (filterType: keyof SelectedFilters, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].filter((f) => f !== value),
    }));
  };

  // Toggle filter section
  const toggleFilterSection = (section: keyof ExpandedFilters) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Get active filters for display
  const activeFilters = useMemo(() => {
    const filters: { type: keyof SelectedFilters; value: string }[] = [];
    (Object.entries(selectedFilters) as [keyof SelectedFilters, string[]][]).forEach(
      ([type, values]) => {
        values.forEach((value) => {
          filters.push({ type, value });
        });
      }
    );
    return filters;
  }, [selectedFilters]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Format salary for display
  const formatSalary = (salary: { min: number | null; max: number | null; currency: string; period: string }) => {
    if (!salary.min || !salary.max) return 'Salary Not Disclosed';

    if (salary.period === 'hourly') {
      return `$${salary.min} - $${salary.max} /hr`;
    }

    if (salary.period === 'monthly') {
      return `$${(salary.min / 1000).toFixed(1)}K - $${(salary.max / 1000).toFixed(1)}K /month`;
    }

    return `$${(salary.min / 1000).toFixed(0)}K - $${(salary.max / 1000).toFixed(0)}K /year`;
  };


  // Get badge styles based on job properties
  const getBadgeStyles = (job: DisplayJob) => {
    if (job.isUrgent) {
      return {
        bg: 'bg-red-500/20',
        text: 'text-red-400',
        border: 'border-red-500/30',
        label: 'Urgent',
        icon: <AlertCircle size={12} />,
      };
    }
    if (job.isFeatured) {
      return {
        bg: 'bg-amber-500/20',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        label: 'Featured',
        icon: <Sparkles size={12} />,
      };
    }
    return {
      bg: 'bg-emerald-500/20',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      label: 'New',
      icon: <Zap size={12} />,
    };
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-6">
              <Briefcase size={16} />
              Career Opportunities
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-heading">
              Connecting Purpose With{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Opportunity
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
              Manage your career journey with clarity, confidence, and connection. Explore
              opportunities that align with your goals and expertise.
            </p>

            <a
              href="#jobs-list"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 active:scale-95"
            >
              View Openings
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative z-10 -mt-8">
        <div className="container-custom">
          <motion.form
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl"
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* What Field */}
              <div className="md:col-span-5">
                <label className="block text-gray-400 text-sm font-medium mb-2">What</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Job title, skill, or keyword"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-11 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  />
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                </div>
              </div>

              {/* Where Field */}
              <div className="md:col-span-5">
                <label className="block text-gray-400 text-sm font-medium mb-2">Where</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="City, State/Province, or Country"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-11 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  />
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="md:col-span-2 flex items-end">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 active:scale-95"
                >
                  Search
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10 py-12" id="jobs-list">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <button
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-colors"
              onClick={() => setIsFilterOpen(true)}
            >
              <SlidersHorizontal size={18} />
              Filters
              {activeFilters.length > 0 && (
                <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs rounded-full">
                  {activeFilters.length}
                </span>
              )}
            </button>

            {/* Filter Overlay (Mobile) */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsFilterOpen(false)}
                />
              )}
            </AnimatePresence>

            {/* Filters Sidebar */}
            <AnimatePresence>
              <motion.aside
                className={`fixed lg:relative top-0 left-0 h-full lg:h-auto w-80 lg:w-72 xl:w-80 bg-gray-900 lg:bg-transparent z-50 lg:z-auto transform transition-transform duration-300 ${isFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                  }`}
                initial={false}
              >
                <div className="h-full lg:h-auto overflow-y-auto lg:overflow-visible p-6 lg:p-0">
                  {/* Filters Header */}
                  <div className="flex items-center justify-between mb-6 lg:mb-4">
                    <h3 className="flex items-center gap-2 text-white font-semibold">
                      <Filter size={18} className="text-emerald-400" />
                      Filters
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={clearAllFilters}
                        className="text-gray-400 text-sm hover:text-emerald-400 transition-colors"
                      >
                        Clear All
                      </button>
                      <button
                        className="lg:hidden w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => setIsFilterOpen(false)}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Filter Groups */}
                  <div className="space-y-4">
                    {/* Job Type Filter */}
                    <FilterGroup
                      title="Job Type"
                      isExpanded={expandedFilters.jobTypes}
                      onToggle={() => toggleFilterSection('jobTypes')}
                    >
                      {filterOptions.jobTypes.map((option) => (
                        <FilterOption
                          key={option.value}
                          label={option.label}
                          count={option.count}
                          checked={selectedFilters.jobTypes.includes(option.value)}
                          onChange={() => handleFilterChange('jobTypes', option.value)}
                        />
                      ))}
                    </FilterGroup>

                    {/* Industry Filter */}
                    <FilterGroup
                      title="Industry"
                      isExpanded={expandedFilters.industries}
                      onToggle={() => toggleFilterSection('industries')}
                      searchable
                      searchValue={filterSearches.industries}
                      onSearchChange={(value) =>
                        setFilterSearches((prev) => ({ ...prev, industries: value }))
                      }
                      searchPlaceholder="Search industries..."
                    >
                      {filterOptions.industries
                        .filter((option) =>
                          option.label.toLowerCase().includes(filterSearches.industries.toLowerCase())
                        )
                        .map((option) => (
                          <FilterOption
                            key={option.value}
                            label={option.label}
                            count={option.count}
                            checked={selectedFilters.industries.includes(option.value)}
                            onChange={() => handleFilterChange('industries', option.value)}
                          />
                        ))}
                    </FilterGroup>

                    {/* Category Filter */}
                    <FilterGroup
                      title="Category"
                      isExpanded={expandedFilters.categories}
                      onToggle={() => toggleFilterSection('categories')}
                    >
                      {filterOptions.categories.map((option) => (
                        <FilterOption
                          key={option.value}
                          label={option.label}
                          count={option.count}
                          checked={selectedFilters.categories.includes(option.value)}
                          onChange={() => handleFilterChange('categories', option.value)}
                        />
                      ))}
                    </FilterGroup>

                    {/* Province/State Filter */}
                    <FilterGroup
                      title="Province/State"
                      isExpanded={expandedFilters.locations}
                      onToggle={() => toggleFilterSection('locations')}
                    >
                      {filterOptions.locations.map((option) => (
                        <FilterOption
                          key={option.value}
                          label={option.label}
                          count={option.count}
                          checked={selectedFilters.locations.includes(option.value)}
                          onChange={() => handleFilterChange('locations', option.value)}
                        />
                      ))}
                    </FilterGroup>

                    {/* City Filter */}
                    <FilterGroup
                      title="City"
                      isExpanded={expandedFilters.cities}
                      onToggle={() => toggleFilterSection('cities')}
                      searchable
                      searchValue={filterSearches.cities}
                      onSearchChange={(value) =>
                        setFilterSearches((prev) => ({ ...prev, cities: value }))
                      }
                      searchPlaceholder="Search cities..."
                    >
                      {filterOptions.cities
                        .filter((option) =>
                          option.label.toLowerCase().includes(filterSearches.cities.toLowerCase())
                        )
                        .map((option) => (
                          <FilterOption
                            key={option.value}
                            label={option.label}
                            count={option.count}
                            checked={selectedFilters.cities.includes(option.value)}
                            onChange={() => handleFilterChange('cities', option.value)}
                          />
                        ))}
                    </FilterGroup>

                    {/* Experience Filter */}
                    <FilterGroup
                      title="Experience Level"
                      isExpanded={expandedFilters.experience}
                      onToggle={() => toggleFilterSection('experience')}
                    >
                      {filterOptions.experience.map((option) => (
                        <FilterOption
                          key={option.value}
                          label={option.label}
                          checked={selectedFilters.experience.includes(option.value)}
                          onChange={() => handleFilterChange('experience', option.value)}
                        />
                      ))}
                    </FilterGroup>
                  </div>
                </div>
              </motion.aside>
            </AnimatePresence>

            {/* Jobs Results */}
            <div className="flex-1">
              {/* Job Alert Banner */}
              <motion.div
                className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-5 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <Bell size={24} className="text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Get Job Alerts</h4>
                      <p className="text-gray-400 text-sm">
                        Be the first to know when new jobs matching your criteria are posted.
                      </p>
                    </div>
                  </div>
                  <button className="px-5 py-2.5 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors whitespace-nowrap">
                    Create Alert
                  </button>
                </div>
              </motion.div>

              {/* Results Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                {/* API Status Indicator */}
                {isUsingFallback && (
                  <div className="w-full flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 text-sm mb-4">
                    <WifiOff size={16} />
                    <span>Showing cached data - Server connection unavailable</span>
                  </div>
                )}
                <p className="text-gray-400">
                  Showing <span className="text-white font-semibold">{paginatedJobs.length}</span> of{' '}
                  <span className="text-white font-semibold">{totalJobs}</span> jobs
                </p>

                <div className="flex items-center gap-3">
                  <label className="text-gray-400 text-sm">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50 appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem',
                    }}
                  >
                    <option value="newest" className="bg-gray-800">
                      Newest First
                    </option>
                    <option value="oldest" className="bg-gray-800">
                      Oldest First
                    </option>
                    <option value="salary-high" className="bg-gray-800">
                      Salary (High to Low)
                    </option>
                    <option value="salary-low" className="bg-gray-800">
                      Salary (Low to High)
                    </option>
                    <option value="title" className="bg-gray-800">
                      Title (A-Z)
                    </option>
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeFilters.map((filter, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm"
                    >
                      {filter.value}
                      <button
                        onClick={() => removeFilter(filter.type, filter.value)}
                        className="hover:text-white transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Job Listings */}
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-16"
                  >
                    <Loader2 size={48} className="text-emerald-400 animate-spin mb-4" />
                    <p className="text-gray-400">Loading jobs...</p>
                  </motion.div>
                ) : paginatedJobs.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {paginatedJobs.map((job, index) => {
                      const badgeStyles = getBadgeStyles(job);
                      return (
                        <motion.div
                          key={job.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer"
                          onClick={() => navigate(`/jobs/${job.slug}`)}
                        >
                          {/* Job Header */}
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                            <div className="flex items-start gap-4">
                              {/* Company Logo */}
                              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                {job.company.charAt(0)}
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                                  {job.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mt-1">
                                  <span className="flex items-center gap-1">
                                    <Building2 size={14} />
                                    {job.company}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    {job.location}, {job.country}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Badge & Date */}
                            <div className="flex items-center gap-3">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${badgeStyles.bg} ${badgeStyles.text} border ${badgeStyles.border} rounded-full text-xs font-medium`}
                              >
                                {badgeStyles.icon}
                                {badgeStyles.label}
                              </span>
                              <span className="text-gray-500 text-sm flex items-center gap-1">
                                <Calendar size={14} />
                                {formatDate(job.publishedAt)}
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                            {job.description}
                          </p>

                          {/* Footer */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                            {/* Tags/Skills */}
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium">
                                {job.type}
                              </span>
                              {job.skills.slice(0, 2).map((skill: string, i: number) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-white/5 text-gray-400 rounded-lg text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>

                            {/* Salary */}
                            <div className="flex items-center gap-2">
                              <DollarSign size={16} className="text-emerald-400" />
                              <span className="text-white font-semibold text-sm">
                                {formatSalary(job.salary)}
                              </span>

                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <AlertCircle size={40} className="text-gray-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No Jobs Found</h3>
                    <p className="text-gray-400 mb-6">
                      Try adjusting your search criteria or filters to find more opportunities.
                    </p>
                    <button
                      onClick={clearAllFilters}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all"
                    >
                      Clear All Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ‹
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${currentPage === page
                            ? 'bg-emerald-500 text-white'
                            : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="text-gray-500">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Filter Group Component
interface FilterGroupProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

const FilterGroup = ({
  title,
  isExpanded,
  onToggle,
  children,
  searchable,
  searchValue,
  onSearchChange,
  searchPlaceholder,
}: FilterGroupProps) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-white font-medium hover:bg-white/5 transition-colors"
      >
        <span>{title}</span>
        {isExpanded ? (
          <ChevronUp size={18} className="text-gray-400" />
        ) : (
          <ChevronDown size={18} className="text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4">
          {searchable && onSearchChange && (
            <div className="relative mb-3">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-3 py-2 pl-9 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
              />
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          )}
          <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">{children}</div>
        </div>
      )}
    </div>
  );
};

// Filter Option Component
interface FilterOptionProps {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}

const FilterOption = ({ label, count, checked, onChange }: FilterOptionProps) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-gray-600 bg-white/5 text-emerald-500 focus:ring-emerald-500/20 focus:ring-2 cursor-pointer"
      />
      <span className="text-gray-400 text-sm group-hover:text-white transition-colors flex-1">
        {label}
      </span>
      {count !== undefined && <span className="text-gray-600 text-xs">({count})</span>}
    </label>
  );
};

export default JobsPage;