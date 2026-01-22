import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  MessageSquare,
  Search,
  UserCheck,
  Calendar,
  Handshake,
  ArrowRight,
} from 'lucide-react';

const Process = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      number: 1,
      title: 'Initial Consultation',
      description:
        'We learn about your company culture, technical requirements, and ideal candidate profile to ensure perfect alignment.',
      icon: <MessageSquare size={32} />,
      color: 'emerald',
    },
    {
      number: 2,
      title: 'Talent Search',
      description:
        'Our team proactively headhunts qualified technicians and operators through our extensive network and databases.',
      icon: <Search size={32} />,
      color: 'blue',
    },
    {
      number: 3,
      title: 'Screening & Vetting',
      description:
        'Rigorous assessment of technical skills, experience verification, and cultural fit evaluation for each candidate.',
      icon: <UserCheck size={32} />,
      color: 'amber',
    },
    {
      number: 4,
      title: 'Interview Coordination',
      description:
        'We manage all scheduling, prepare candidates, and facilitate smooth communication throughout the process.',
      icon: <Calendar size={32} />,
      color: 'purple',
    },
    {
      number: 5,
      title: 'Successful Placement',
      description:
        'Final negotiations, offer management, and onboarding support to ensure a seamless transition for your new hire.',
      icon: <Handshake size={32} />,
      color: 'teal',
    },
  ];

  const getStepColors = (color: string) => {
    const colors: Record<
      string,
      {
        bg: string;
        text: string;
        border: string;
        gradient: string;
        shadow: string;
        number: string;
      }
    > = {
      emerald: {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        gradient: 'from-emerald-500 to-emerald-600',
        shadow: 'shadow-emerald-500/20',
        number: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      },
      blue: {
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
        gradient: 'from-blue-500 to-blue-600',
        shadow: 'shadow-blue-500/20',
        number: 'bg-gradient-to-br from-blue-500 to-blue-600',
      },
      amber: {
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        gradient: 'from-amber-500 to-amber-600',
        shadow: 'shadow-amber-500/20',
        number: 'bg-gradient-to-br from-amber-500 to-amber-600',
      },
      purple: {
        bg: 'bg-purple-500/10',
        text: 'text-purple-400',
        border: 'border-purple-500/30',
        gradient: 'from-purple-500 to-purple-600',
        shadow: 'shadow-purple-500/20',
        number: 'bg-gradient-to-br from-purple-500 to-purple-600',
      },
      teal: {
        bg: 'bg-teal-500/10',
        text: 'text-teal-400',
        border: 'border-teal-500/30',
        gradient: 'from-teal-500 to-teal-600',
        shadow: 'shadow-teal-500/20',
        number: 'bg-gradient-to-br from-teal-500 to-teal-600',
      },
    };
    return colors[color] || colors.emerald;
  };

  return (
    <section
      id="process"
      className="relative py-20 md:py-32 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

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
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-6">
            <ArrowRight size={16} />
            Our Process
          </span>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight font-heading">
            How We Connect You With{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Top Talent
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            Our streamlined recruitment process ensures efficient, effective, and
            confidential hiring for your technical positions.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Vertical Timeline Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            {/* Background Line */}
            <div className="absolute inset-0 bg-white/10" />
            {/* Animated Fill */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500"
              initial={{ height: 0 }}
              animate={inView ? { height: '100%' } : {}}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
          </div>

          {/* Vertical Timeline Line - Mobile */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-px">
            {/* Background Line */}
            <div className="absolute inset-0 bg-white/10" />
            {/* Animated Fill */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500"
              initial={{ height: 0 }}
              animate={inView ? { height: '100%' } : {}}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
          </div>

          {/* Process Steps */}
          <div className="relative space-y-12 lg:space-y-0">
            {steps.map((step, index) => {
              const colors = getStepColors(step.color);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  className={`relative flex items-center lg:items-stretch ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  {/* Content Card - Desktop Left/Right */}
                  <div
                    className={`hidden lg:block lg:w-1/2 ${
                      isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:text-left'
                    }`}
                  >
                    <motion.div
                      className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-xl ${colors.shadow}`}
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Icon - Desktop */}
                      <div
                        className={`inline-flex w-14 h-14 ${colors.bg} rounded-xl items-center justify-center mb-4 ${colors.text} transition-all duration-300 group-hover:scale-110`}
                      >
                        {step.icon}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Number - Desktop */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-20">
                    <motion.div
                      className={`w-14 h-14 ${colors.number} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg ${colors.shadow}`}
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
                    >
                      {step.number}
                    </motion.div>
                  </div>

                  {/* Spacer - Desktop */}
                  <div className="hidden lg:block lg:w-1/2" />

                  {/* Mobile Layout */}
                  <div className="lg:hidden flex items-start gap-6 pl-4">
                    {/* Mobile Number */}
                    <motion.div
                      className={`relative z-20 flex-shrink-0 w-12 h-12 ${colors.number} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${colors.shadow}`}
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
                    >
                      {step.number}
                    </motion.div>

                    {/* Mobile Content */}
                    <div className="flex-1 pb-8">
                      <div
                        className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 transition-all duration-500 hover:bg-white/10`}
                      >
                        {/* Icon - Mobile */}
                        <div
                          className={`inline-flex w-12 h-12 ${colors.bg} rounded-xl items-center justify-center mb-3 ${colors.text}`}
                        >
                          {step.icon}
                        </div>

                        <h3 className="text-lg font-bold text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <p className="text-gray-400 mb-6">
            Ready to start your recruitment journey?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 active:scale-95"
            >
              Start Hiring Now
              <ArrowRight size={20} />
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

export default Process;