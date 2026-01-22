import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Search,
  UserCheck,
  Calendar,
  Briefcase,
  Target,
  Shield,
  CheckCircle,
} from 'lucide-react';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: <Search size={32} />,
      title: 'Talent Sourcing',
      description:
        'We proactively identify and engage top technical talent through our extensive network and advanced sourcing techniques.',
      features: ['Direct headhunting', 'Passive candidate outreach', 'Industry networking'],
      color: 'blue',
    },
    {
      icon: <UserCheck size={32} />,
      title: 'Candidate Screening',
      description:
        'Rigorous vetting process ensures only qualified candidates with verified skills and experience reach your desk.',
      features: ['Skills assessment', 'Background verification', 'Reference checks'],
      color: 'cyan',
    },
    {
      icon: <Calendar size={32} />,
      title: 'Interview Coordination',
      description:
        'We handle all scheduling logistics, ensuring a smooth interview process for both clients and candidates.',
      features: ['Schedule management', 'Candidate preparation', 'Feedback collection'],
      color: 'emerald',
    },
    {
      icon: <Briefcase size={32} />,
      title: 'Permanent Placements',
      description:
        'We specialize in permanent role placements, finding candidates who will grow with your organization.',
      features: ['Full-time positions', 'Executive search', 'Team building'],
      color: 'amber',
    },
    {
      icon: <Target size={32} />,
      title: 'Industry Specialization',
      description:
        'Deep expertise in technical and industrial sectors ensures we understand your specific hiring needs.',
      features: ['Manufacturing', 'Industrial equipment', 'Technical services'],
      color: 'purple',
    },
    {
      icon: <Shield size={32} />,
      title: 'Confidential Search',
      description:
        'Discreet recruitment for sensitive positions where confidentiality is paramount.',
      features: ['Executive positions', 'Competitive hiring', 'Private searches'],
      color: 'rose',
    },
  ];

  const getCardColors = (color: string) => {
    const colors: Record<
      string,
      {
        iconBg: string;
        iconColor: string;
        border: string;
        glow: string;
        checkColor: string;
        gradient: string;
      }
    > = {
      blue: {
        iconBg: 'bg-blue-500/10',
        iconColor: 'text-blue-400',
        border: 'hover:border-blue-500/50',
        glow: 'hover:shadow-blue-500/10',
        checkColor: 'text-blue-400',
        gradient: 'from-blue-500 to-blue-600',
      },
      cyan: {
        iconBg: 'bg-cyan-500/10',
        iconColor: 'text-cyan-400',
        border: 'hover:border-cyan-500/50',
        glow: 'hover:shadow-cyan-500/10',
        checkColor: 'text-cyan-400',
        gradient: 'from-cyan-500 to-cyan-600',
      },
      emerald: {
        iconBg: 'bg-emerald-500/10',
        iconColor: 'text-emerald-400',
        border: 'hover:border-emerald-500/50',
        glow: 'hover:shadow-emerald-500/10',
        checkColor: 'text-emerald-400',
        gradient: 'from-emerald-500 to-emerald-600',
      },
      amber: {
        iconBg: 'bg-amber-500/10',
        iconColor: 'text-amber-400',
        border: 'hover:border-amber-500/50',
        glow: 'hover:shadow-amber-500/10',
        checkColor: 'text-amber-400',
        gradient: 'from-amber-500 to-amber-600',
      },
      purple: {
        iconBg: 'bg-purple-500/10',
        iconColor: 'text-purple-400',
        border: 'hover:border-purple-500/50',
        glow: 'hover:shadow-purple-500/10',
        checkColor: 'text-purple-400',
        gradient: 'from-purple-500 to-purple-600',
      },
      rose: {
        iconBg: 'bg-rose-500/10',
        iconColor: 'text-rose-400',
        border: 'hover:border-rose-500/50',
        glow: 'hover:shadow-rose-500/10',
        checkColor: 'text-rose-400',
        gradient: 'from-rose-500 to-rose-600',
      },
    };
    return colors[color] || colors.blue;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="services"
      className="relative py-20 md:py-32 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-6">
            <Briefcase size={16} />
            Our Services
          </span>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight font-heading">
            Comprehensive{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Recruitment Solutions
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            From talent sourcing to final placement, we provide end-to-end recruitment
            services tailored for technical and industrial professionals.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {services.map((service, index) => {
            const colors = getCardColors(service.color);
            return (
              <motion.div
                key={index}
                className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 transition-all duration-500 hover:bg-white/10 ${colors.border} ${colors.glow} hover:shadow-2xl hover:-translate-y-2`}
                variants={cardVariants}
              >
                {/* Gradient Overlay on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}
                />

                {/* Icon */}
                <div
                  className={`relative w-16 h-16 ${colors.iconBg} rounded-2xl flex items-center justify-center mb-6 ${colors.iconColor} transition-all duration-300 group-hover:scale-110`}
                >
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="relative text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="relative text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="relative space-y-3">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-300 text-sm"
                    >
                      <CheckCircle size={16} className={`${colors.checkColor} flex-shrink-0`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom Gradient Line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-gray-400 mb-6">
            Need a custom recruitment solution?{' '}
            <span className="text-white">Let's discuss your requirements.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 active:scale-95"
            >
              Get in Touch
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              href="#jobs"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-95"
            >
              View Open Positions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;