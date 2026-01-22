import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Shield, Zap, Users, ArrowRight } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Target size={24} />,
      title: 'Consultative Approach',
      description: 'We understand your unique needs',
      color: 'emerald',
    },
    {
      icon: <Shield size={24} />,
      title: 'Confidential Process',
      description: 'Discreet headhunting guaranteed',
      color: 'blue',
    },
    {
      icon: <Zap size={24} />,
      title: 'Data-Driven',
      description: 'Matching powered by analytics',
      color: 'amber',
    },
    {
      icon: <Users size={24} />,
      title: 'Proactive Sourcing',
      description: 'We find talent, not wait for it',
      color: 'purple',
    },
  ];

  const getFeatureColors = (color: string) => {
    const colors: Record<string, { bg: string; icon: string; border: string; shadow: string; hoverBg: string }> = {
      emerald: {
        bg: 'bg-emerald-100',
        icon: 'text-emerald-600',
        border: 'border-emerald-200 hover:border-emerald-300',
        shadow: 'group-hover:shadow-emerald-100',
        hoverBg: 'hover:bg-emerald-50',
      },
      blue: {
        bg: 'bg-blue-100',
        icon: 'text-blue-600',
        border: 'border-blue-200 hover:border-blue-300',
        shadow: 'group-hover:shadow-blue-100',
        hoverBg: 'hover:bg-blue-50',
      },
      amber: {
        bg: 'bg-amber-100',
        icon: 'text-amber-600',
        border: 'border-amber-200 hover:border-amber-300',
        shadow: 'group-hover:shadow-amber-100',
        hoverBg: 'hover:bg-amber-50',
      },
      purple: {
        bg: 'bg-purple-100',
        icon: 'text-purple-600',
        border: 'border-purple-200 hover:border-purple-300',
        shadow: 'group-hover:shadow-purple-100',
        hoverBg: 'hover:bg-purple-50',
      },
    };
    return colors[color] || colors.emerald;
  };

  return (
    <section
      id="about"
      className="relative py-20 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
        
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
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Glow Effect Behind Illustration */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/50 to-blue-200/50 rounded-3xl blur-3xl" />

            {/* Illustration Container */}
            <div className="relative bg-white border border-gray-200 rounded-3xl p-8 shadow-xl shadow-gray-200/50">
              <svg viewBox="0 0 500 450" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                {/* Background gradient circle */}
                <defs>
                  <linearGradient id="bgGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.15"/>
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.15"/>
                  </linearGradient>
                  <linearGradient id="lineGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981"/>
                    <stop offset="100%" stopColor="#06b6d4"/>
                  </linearGradient>
                  <linearGradient id="personGradientLight" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#047857"/>
                    <stop offset="100%" stopColor="#10b981"/>
                  </linearGradient>
                  <filter id="shadowLight" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.1"/>
                  </filter>
                </defs>
                
                {/* Main background circle */}
                <circle cx="250" cy="225" r="180" fill="url(#bgGradientLight)"/>
                
                {/* Connection lines */}
                <g opacity="0.5">
                  <path d="M250 225 L120 140" stroke="url(#lineGradientLight)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite"/>
                  </path>
                  <path d="M250 225 L380 140" stroke="url(#lineGradientLight)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite"/>
                  </path>
                  <path d="M250 225 L120 310" stroke="url(#lineGradientLight)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite"/>
                  </path>
                  <path d="M250 225 L380 310" stroke="url(#lineGradientLight)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite"/>
                  </path>
                  <path d="M250 225 L250 80" stroke="url(#lineGradientLight)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite"/>
                  </path>
                </g>
                
                {/* Center hub - Main recruiter */}
                <g filter="url(#shadowLight)">
                  <circle cx="250" cy="225" r="55" fill="#f8fafc"/>
                  <circle cx="250" cy="225" r="50" fill="url(#personGradientLight)"/>
                  {/* Person icon */}
                  <circle cx="250" cy="210" r="15" fill="white"/>
                  <path d="M225 250 Q225 230 250 230 Q275 230 275 250" fill="white"/>
                  {/* Briefcase detail */}
                  <rect x="238" y="252" width="24" height="16" rx="3" fill="#047857"/>
                  <rect x="244" y="248" width="12" height="6" rx="2" fill="#047857"/>
                </g>
                
                {/* Top candidate */}
                <g filter="url(#shadowLight)">
                  <circle cx="250" cy="65" r="35" fill="#f8fafc"/>
                  <circle cx="250" cy="55" r="12" fill="#10b981"/>
                  <path d="M232 78 Q232 65 250 65 Q268 65 268 78" fill="#10b981"/>
                  {/* Checkmark badge */}
                  <circle cx="275" cy="50" r="12" fill="#10b981"/>
                  <path d="M270 50 L273 53 L281 45" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </g>
                
                {/* Top-left candidate */}
                <g filter="url(#shadowLight)">
                  <circle cx="120" cy="130" r="32" fill="#f8fafc"/>
                  <circle cx="120" cy="120" r="11" fill="#f97316"/>
                  <path d="M104 145 Q104 133 120 133 Q136 133 136 145" fill="#f97316"/>
                  {/* Star badge */}
                  <circle cx="142" cy="115" r="10" fill="#f97316"/>
                  <path d="M142 108 L143.5 113 L149 113 L144.5 116 L146 121 L142 118 L138 121 L139.5 116 L135 113 L140.5 113 Z" fill="white"/>
                </g>
                
                {/* Top-right candidate */}
                <g filter="url(#shadowLight)">
                  <circle cx="380" cy="130" r="32" fill="#f8fafc"/>
                  <circle cx="380" cy="120" r="11" fill="#8b5cf6"/>
                  <path d="M364 145 Q364 133 380 133 Q396 133 396 145" fill="#8b5cf6"/>
                  {/* Document badge */}
                  <rect x="395" y="105" width="16" height="20" rx="2" fill="#8b5cf6"/>
                  <rect x="398" y="110" width="10" height="2" fill="white"/>
                  <rect x="398" y="114" width="8" height="2" fill="white"/>
                  <rect x="398" y="118" width="10" height="2" fill="white"/>
                </g>
                
                {/* Bottom-left candidate */}
                <g filter="url(#shadowLight)">
                  <circle cx="120" cy="320" r="32" fill="#f8fafc"/>
                  <circle cx="120" cy="310" r="11" fill="#06b6d4"/>
                  <path d="M104 335 Q104 323 120 323 Q136 323 136 335" fill="#06b6d4"/>
                  {/* Gear badge */}
                  <circle cx="145" cy="305" r="12" fill="#06b6d4"/>
                  <circle cx="145" cy="305" r="5" fill="white"/>
                </g>
                
                {/* Bottom-right candidate */}
                <g filter="url(#shadowLight)">
                  <circle cx="380" cy="320" r="32" fill="#f8fafc"/>
                  <circle cx="380" cy="310" r="11" fill="#ec4899"/>
                  <path d="M364 335 Q364 323 380 323 Q396 323 396 335" fill="#ec4899"/>
                  {/* Award badge */}
                  <circle cx="405" cy="305" r="12" fill="#ec4899"/>
                  <circle cx="405" cy="302" r="6" fill="white"/>
                  <path d="M401 308 L405 315 L409 308" fill="white"/>
                </g>
                
                {/* Data flow particles */}
                <circle r="4" fill="#10b981">
                  <animateMotion dur="3s" repeatCount="indefinite" path="M250,225 Q200,180 120,140"/>
                </circle>
                <circle r="4" fill="#06b6d4">
                  <animateMotion dur="3s" repeatCount="indefinite" path="M250,225 Q300,180 380,140" begin="0.5s"/>
                </circle>
                <circle r="4" fill="#10b981">
                  <animateMotion dur="3s" repeatCount="indefinite" path="M250,225 L250,80" begin="1s"/>
                </circle>
              </svg>
            </div>

            {/* Experience Badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 md:bottom-8 md:right-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 shadow-xl shadow-emerald-500/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-1">100%</h3>
              <p className="text-emerald-100 text-sm md:text-base font-medium">Dedicated to Your Success</p>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Section Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-200 rounded-full text-emerald-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              About TalentConnectors
            </span>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight font-heading">
              Your Trusted Partner for{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Technical Talent
              </span>{' '}
              Acquisition
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              TalentConnectors is a specialist recruitment brand.
              We partner with ambitious companies across Canada and the USA to build high-impact
              teams in technical, industrial, and leadership roles.
            </p>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Our approach is consultative, data-driven, and confidential. We don't post jobs
              and wait — we proactively headhunt the best technicians, machine operators, and
              skilled professionals in the market.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => {
                const colors = getFeatureColors(feature.color);
                return (
                  <motion.div
                    key={index}
                    className={`group flex items-start gap-4 p-4 rounded-xl bg-white border ${colors.border} shadow-sm transition-all duration-300 ${colors.hoverBg} ${colors.shadow} hover:shadow-lg`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className={`flex-shrink-0 w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center ${colors.icon}`}>
                      {feature.icon}
                    </div>
                    <div className="text-left">
                      <h4 className="text-gray-900 font-semibold mb-1">{feature.title}</h4>
                      <p className="text-gray-500 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 hover:shadow-emerald-600/40 transition-all duration-300 active:scale-95"
              >
                Our Services
                <ArrowRight size={20} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 active:scale-95"
              >
                Partner With Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;