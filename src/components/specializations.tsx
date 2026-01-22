import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Wrench,
  TrendingUp,
  Users,
  Building2,
  CheckCircle,
  ArrowRight,
  Briefcase,
  Target,
  Shield,
} from 'lucide-react';

const Specializations = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const specializations = [
    {
      id: 1,
      icon: <Wrench size={24} />,
      title: 'Field Service Technician',
      subtitle: 'Machinery & OEMs',
      description:
        'Recruiting field service technicians for defined service territories and national OEM programs.',
      roles: [
        'Field Service Technicians',
        'CNC & Automation Techs',
        'Service Supervisors',
      ],
      highlight: 'Industry-Aligned Screening',
      color: 'blue',
    },
    {
      id: 2,
      icon: <TrendingUp size={24} />,
      title: 'Machinery Sales',
      subtitle: 'OEM & Distributor',
      description:
        'Experienced sales professionals for OEMs and distributors across North America.',
      roles: [
        'Machinery Sales Reps',
        'Technical Sales Engineers',
        'Territory Managers',
      ],
      highlight: 'Retained-Search Approach',
      color: 'cyan',
    },
    {
      id: 3,
      icon: <Users size={24} />,
      title: 'Leadership Recruitment',
      subtitle: 'Executive Search',
      description:
        'Confidential leadership recruitment aligned with service operations and growth.',
      roles: [
        'Service Managers',
        'Regional Directors',
        'General Managers',
      ],
      highlight: 'Executive Methodology',
      color: 'amber',
    },
    {
      id: 4,
      icon: <Building2 size={24} />,
      title: 'Full-Cycle Recruitment',
      subtitle: 'North America',
      description:
        'Retained-search firm serving industrial machinery manufacturers and OEMs.',
      roles: [
        'Territory-Based Sales',
        'Multi-Region Service',
        'Dealer Networks',
      ],
      highlight: 'OEM & Distributor-Aligned',
      color: 'emerald',
    },
  ];

  const getCardColors = (color: string) => {
    const colors: Record<
      string,
      {
        iconBg: string;
        iconColor: string;
        border: string;
        badge: string;
        badgeText: string;
        highlight: string;
        gradient: string;
      }
    > = {
      blue: {
        iconBg: 'bg-blue-500/10',
        iconColor: 'text-blue-400',
        border: 'hover:border-blue-500/40',
        badge: 'bg-blue-500/10 border-blue-500/20',
        badgeText: 'text-blue-400',
        highlight: 'bg-blue-500/5 border-blue-500/20',
        gradient: 'from-blue-500 to-blue-600',
      },
      cyan: {
        iconBg: 'bg-cyan-500/10',
        iconColor: 'text-cyan-400',
        border: 'hover:border-cyan-500/40',
        badge: 'bg-cyan-500/10 border-cyan-500/20',
        badgeText: 'text-cyan-400',
        highlight: 'bg-cyan-500/5 border-cyan-500/20',
        gradient: 'from-cyan-500 to-cyan-600',
      },
      amber: {
        iconBg: 'bg-amber-500/10',
        iconColor: 'text-amber-400',
        border: 'hover:border-amber-500/40',
        badge: 'bg-amber-500/10 border-amber-500/20',
        badgeText: 'text-amber-400',
        highlight: 'bg-amber-500/5 border-amber-500/20',
        gradient: 'from-amber-500 to-amber-600',
      },
      emerald: {
        iconBg: 'bg-emerald-500/10',
        iconColor: 'text-emerald-400',
        border: 'hover:border-emerald-500/40',
        badge: 'bg-emerald-500/10 border-emerald-500/20',
        badgeText: 'text-emerald-400',
        highlight: 'bg-emerald-500/5 border-emerald-500/20',
        gradient: 'from-emerald-500 to-emerald-600',
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
    hidden: { opacity: 0, y: 20 },
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
      id="specializations"
      className="relative py-16 md:py-24 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-medium mb-4">
            <Target size={14} />
            Our Specializations
          </span>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight font-heading">
            Recruitment Expertise for{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Machinery Industries
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Deep familiarity with capital equipment sales, regional service territories,
            and after-sales operations across North America.
          </p>
        </motion.div>

        {/* Specialization Cards - 2x2 Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {specializations.map((spec) => {
            const colors = getCardColors(spec.color);

            return (
              <motion.div
                key={spec.id}
                className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 transition-all duration-300 hover:bg-white/10 ${colors.border} hover:shadow-lg hover:-translate-y-1`}
                variants={cardVariants}
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 ${colors.iconBg} rounded-lg flex items-center justify-center flex-shrink-0 ${colors.iconColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    {spec.icon}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-white leading-tight">
                      {spec.title}
                    </h3>
                    <span className={`text-xs ${colors.badgeText}`}>
                      {spec.subtitle}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {spec.description}
                </p>

                {/* Roles */}
                <div className="mb-4">
                  <h4 className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 mb-2">
                    <Briefcase size={12} />
                    Key Roles
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {spec.roles.map((role, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400"
                      >
                        <CheckCircle size={10} className={colors.iconColor} />
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlight Badge */}
                <div
                  className={`flex items-center gap-2 px-3 py-2 ${colors.highlight} border rounded-lg`}
                >
                  <Shield size={14} className={colors.iconColor} />
                  <span className={`text-xs font-medium ${colors.badgeText}`}>
                    {spec.highlight}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 active:scale-95 text-sm"
          >
            Discuss Your Hiring Needs
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Specializations;