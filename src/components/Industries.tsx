import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Cpu,
  Wrench,
  Zap,
  Truck,
  Building2,
  Cog,
  HardHat,
  Factory,
} from 'lucide-react';

const Industries = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const industries = [
    {
      icon: <Factory size={36} />,
      title: 'Manufacturing',
      description: 'CNC operators, machinists, quality control',
      color: 'emerald',
    },
    {
      icon: <Zap size={36} />,
      title: 'Electrical',
      description: 'Electricians, control technicians, PLCs',
      color: 'amber',
    },
    {
      icon: <Wrench size={36} />,
      title: 'Mechanical',
      description: 'Maintenance techs, millwrights, mechanics',
      color: 'blue',
    },
    {
      icon: <Cog size={36} />,
      title: 'Industrial Equipment',
      description: 'Equipment operators, field service techs',
      color: 'purple',
    },
    {
      icon: <HardHat size={36} />,
      title: 'Construction',
      description: 'Heavy equipment, skilled trades, supervisors',
      color: 'orange',
    },
    {
      icon: <Truck size={36} />,
      title: 'Logistics',
      description: 'Warehouse techs, fleet mechanics, drivers',
      color: 'cyan',
    },
    {
      icon: <Cpu size={36} />,
      title: 'Automation',
      description: 'Robotics techs, automation engineers',
      color: 'rose',
    },
    {
      icon: <Building2 size={36} />,
      title: 'Facilities',
      description: 'HVAC technicians, building maintenance',
      color: 'teal',
    },
  ];

  const getCardColors = (color: string) => {
    const colors: Record<
      string,
      {
        iconBg: string;
        iconColor: string;
        border: string;
        hoverBg: string;
        gradient: string;
        shadow: string;
      }
    > = {
      emerald: {
        iconBg: 'bg-emerald-100 group-hover:bg-emerald-200',
        iconColor: 'text-emerald-600',
        border: 'border-gray-200 group-hover:border-emerald-300',
        hoverBg: 'group-hover:bg-emerald-50',
        gradient: 'from-emerald-500 to-emerald-600',
        shadow: 'group-hover:shadow-emerald-100',
      },
      amber: {
        iconBg: 'bg-amber-100 group-hover:bg-amber-200',
        iconColor: 'text-amber-600',
        border: 'border-gray-200 group-hover:border-amber-300',
        hoverBg: 'group-hover:bg-amber-50',
        gradient: 'from-amber-500 to-amber-600',
        shadow: 'group-hover:shadow-amber-100',
      },
      blue: {
        iconBg: 'bg-blue-100 group-hover:bg-blue-200',
        iconColor: 'text-blue-600',
        border: 'border-gray-200 group-hover:border-blue-300',
        hoverBg: 'group-hover:bg-blue-50',
        gradient: 'from-blue-500 to-blue-600',
        shadow: 'group-hover:shadow-blue-100',
      },
      purple: {
        iconBg: 'bg-purple-100 group-hover:bg-purple-200',
        iconColor: 'text-purple-600',
        border: 'border-gray-200 group-hover:border-purple-300',
        hoverBg: 'group-hover:bg-purple-50',
        gradient: 'from-purple-500 to-purple-600',
        shadow: 'group-hover:shadow-purple-100',
      },
      orange: {
        iconBg: 'bg-orange-100 group-hover:bg-orange-200',
        iconColor: 'text-orange-600',
        border: 'border-gray-200 group-hover:border-orange-300',
        hoverBg: 'group-hover:bg-orange-50',
        gradient: 'from-orange-500 to-orange-600',
        shadow: 'group-hover:shadow-orange-100',
      },
      cyan: {
        iconBg: 'bg-cyan-100 group-hover:bg-cyan-200',
        iconColor: 'text-cyan-600',
        border: 'border-gray-200 group-hover:border-cyan-300',
        hoverBg: 'group-hover:bg-cyan-50',
        gradient: 'from-cyan-500 to-cyan-600',
        shadow: 'group-hover:shadow-cyan-100',
      },
      rose: {
        iconBg: 'bg-rose-100 group-hover:bg-rose-200',
        iconColor: 'text-rose-600',
        border: 'border-gray-200 group-hover:border-rose-300',
        hoverBg: 'group-hover:bg-rose-50',
        gradient: 'from-rose-500 to-rose-600',
        shadow: 'group-hover:shadow-rose-100',
      },
      teal: {
        iconBg: 'bg-teal-100 group-hover:bg-teal-200',
        iconColor: 'text-teal-600',
        border: 'border-gray-200 group-hover:border-teal-300',
        hoverBg: 'group-hover:bg-teal-50',
        gradient: 'from-teal-500 to-teal-600',
        shadow: 'group-hover:shadow-teal-100',
      },
    };
    return colors[color] || colors.emerald;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <section
      id="industries"
      className="relative py-20 md:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-200/50 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-200/50 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />

        {/* Diagonal Lines Pattern */}
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              rgba(229,231,235,0.5) 40px,
              rgba(229,231,235,0.5) 80px
            )`,
          }}
        />

        {/* Dot Grid Pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
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
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-200 rounded-full text-emerald-700 text-sm font-medium mb-6">
            <Cog size={16} className="animate-spin-slow" />
            Industries We Serve
          </span>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight font-heading">
            Specialized in{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Technical & Industrial
            </span>{' '}
            Sectors
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            We have deep expertise in recruiting for technical roles across diverse
            industrial sectors in Canada and the United States.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {industries.map((industry, index) => {
            const colors = getCardColors(industry.color);
            return (
              <motion.div
                key={index}
                className={`group relative bg-white border ${colors.border} rounded-2xl p-6 text-center transition-all duration-500 ${colors.hoverBg} ${colors.shadow} hover:shadow-xl hover:-translate-y-2 cursor-pointer`}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                {/* Subtle Gradient Overlay on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-[0.03] rounded-2xl transition-opacity duration-500`}
                />

                {/* Icon Container */}
                <div
                  className={`relative w-18 h-18 mx-auto ${colors.iconBg} rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 p-4`}
                >
                  <div className={`${colors.iconColor} transition-colors duration-300`}>
                    {industry.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="relative text-lg font-bold text-gray-900 mb-2 transition-colors duration-300">
                  {industry.title}
                </h3>

                {/* Description */}
                <p className="relative text-gray-500 text-sm leading-relaxed">
                  {industry.description}
                </p>

                {/* Bottom Gradient Line (visible on hover) */}
                <div
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${colors.gradient} rounded-full transition-all duration-500 group-hover:w-1/2`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Stats or CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-10">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                8<span className="text-emerald-600">+</span>
              </div>
              <div className="text-gray-500 text-sm">Industry Sectors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                85<span className="text-amber-600">%</span>
              </div>
              <div className="text-gray-500 text-sm">Better onboarding Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                2<span className="text-blue-600"></span>
              </div>
              <div className="text-gray-500 text-sm">Countries Served</div>
            </div>
          </div>

          {/* CTA Text */}
          <p className="text-gray-600 mb-6">
            Don't see your industry?{' '}
            <a
              href="#contact"
              className="text-emerald-600 hover:text-emerald-700 font-medium underline underline-offset-4 transition-colors"
            >
              Contact us
            </a>{' '}
            — we likely have experience in your sector.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Industries;