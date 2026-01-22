import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Wrench, 
  TrendingUp, 
  Users, 
  Building2, 
  CheckCircle, 
  ArrowRight,
  Settings,
  Briefcase,
  Target,
  Shield
} from 'lucide-react';

const Specializations = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const specializations = [
    {
      id: 1,
      icon: <Wrench size={32} />,
      title: 'Field Service Technician Recruitment',
      subtitle: 'Machinery & OEMs',
      description: 'We recruit field service technicians who support defined service territories, regional customers, and national OEM service programs. Candidates are assessed for technical depth, travel readiness, and customer-facing professionalism.',
      roles: [
        'Field Service Technicians',
        'CNC & Automation Technicians',
        'Installation & Commissioning Technicians',
        'Service Supervisors',
        'Service Managers',
      ],
      highlight: 'Industry-Aligned Screening',
      highlightText: 'Our screening process evaluates machinery expertise, diagnostic capability, safety compliance, and the ability to operate independently in the field.',
      color: 'blue',
    },
    {
      id: 2,
      icon: <TrendingUp size={32} />,
      title: 'Machinery Sales Recruitment',
      subtitle: 'OEM & Distributor Recruiters',
      description: 'We recruit experienced machinery sales professionals for OEMs and distributors operating across defined sales territories in Canada and the United States. Our focus is on candidates with proven success selling capital equipment.',
      roles: [
        'Machinery Sales Representatives',
        'Technical Sales Engineers',
        'Regional Sales Managers',
        'Territory Managers',
        'Business Development Managers',
        'Sales Directors',
      ],
      highlight: 'Retained-Search Approach',
      highlightText: 'Our retained-search methodology ensures confidential, targeted recruitment aligned with your product portfolio, territory structure, and go-to-market strategy.',
      color: 'cyan',
    },
    {
      id: 3,
      icon: <Users size={32} />,
      title: 'OEM & Distributor Leadership',
      subtitle: 'Executive Search',
      description: 'We support OEMs and distributors with confidential leadership recruitment aligned with service operations, territory management, and long-term growth strategies.',
      roles: [
        'Service Managers',
        'Sales Managers',
        'Regional Directors',
        'Parts & Service Leaders',
        'Application Engineers',
        'General Managers',
      ],
      highlight: 'Executive Search Methodology',
      highlightText: 'Our executive search process emphasizes strategic alignment, operational understanding, and cultural fit within machinery-driven organizations.',
      color: 'orange',
    },
    {
      id: 4,
      icon: <Building2 size={32} />,
      title: 'Full-Cycle Machinery Recruitment',
      subtitle: 'North America Coverage',
      description: 'We are a retained-search and specialist recruitment firm serving industrial machinery manufacturers, OEMs, and distributor organizations across North America with deep familiarity with capital equipment sales models.',
      roles: [
        'Territory-Based Sales',
        'Multi-Region Service Coverage',
        'Dealer & Distributor Networks',
        'After-Sales Service Operations',
      ],
      highlight: 'OEM & Distributor-Aligned',
      highlightText: 'Our recruitment approach reflects how machinery businesses operate — we recruit professionals who can operate independently while representing your brand in the field.',
      color: 'green',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        icon: 'bg-blue-500 text-white',
        badge: 'bg-blue-500/10 text-blue-600',
        hover: 'hover:border-blue-500/40',
      },
      cyan: {
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/20',
        icon: 'bg-cyan-500 text-white',
        badge: 'bg-cyan-500/10 text-cyan-600',
        hover: 'hover:border-cyan-500/40',
      },
      orange: {
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/20',
        icon: 'bg-orange-500 text-white',
        badge: 'bg-orange-500/10 text-orange-600',
        hover: 'hover:border-orange-500/40',
      },
      green: {
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        icon: 'bg-emerald-500 text-white',
        badge: 'bg-emerald-500/10 text-emerald-600',
        hover: 'hover:border-emerald-500/40',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-20 md:py-28 bg-slate-50" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 rounded-full text-sm font-medium mb-4">
            <Target size={16} />
            Our Specializations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Recruitment Expertise for Machinery Industries
          </h2>
          <p className="text-slate-600 text-lg">
            We bring deep familiarity with capital equipment sales models, regional service 
            territories, and after-sales service operations across North America.
          </p>
        </motion.div>

        {/* Specialization Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {specializations.map((spec) => {
            const colorClasses = getColorClasses(spec.color);
            
            return (
              <motion.div
                key={spec.id}
                className={`bg-white rounded-2xl border ${colorClasses.border} ${colorClasses.hover} p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                variants={cardVariants}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl ${colorClasses.icon} flex items-center justify-center flex-shrink-0`}>
                    {spec.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {spec.title}
                    </h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colorClasses.badge}`}>
                      {spec.subtitle}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {spec.description}
                </p>

                {/* Roles */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Briefcase size={16} />
                    Roles We Recruit
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {spec.roles.map((role, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm"
                      >
                        <CheckCircle size={14} className="text-emerald-500" />
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlight Box */}
                <div className={`${colorClasses.bg} rounded-xl p-4`}>
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <Shield size={16} />
                    {spec.highlight}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {spec.highlightText}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1"
          >
            Discuss Your Hiring Needs
            <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Specializations;