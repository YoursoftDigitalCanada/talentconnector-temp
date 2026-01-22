// src/pages/AboutPage.tsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import {
  Target,
  Shield,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Briefcase,
  MapPin,
  Clock,
  Heart,
  Zap,
  Globe,
  Handshake,
  TrendingUp,
  Building2,
  Star,
} from 'lucide-react';

const AboutPage = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [whyRef, whyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const values = [
    {
      icon: <Shield size={28} />,
      title: 'Integrity',
      description: 'We operate with complete transparency and honesty in all our dealings.',
      color: 'emerald',
    },
    {
      icon: <Target size={28} />,
      title: 'Excellence',
      description: 'We strive for the highest quality in every placement we make.',
      color: 'blue',
    },
    {
      icon: <Heart size={28} />,
      title: 'Commitment',
      description: 'We are dedicated to the success of both candidates and clients.',
      color: 'rose',
    },
    {
      icon: <Handshake size={28} />,
      title: 'Partnership',
      description: 'We build long-term relationships based on trust and mutual respect.',
      color: 'amber',
    },
  ];

  const stats = [
    { number: '81+', label: 'Improved Efficiency', icon: <Users size={24} /> },
    { number: '100%', label: 'Vetted Candidates', icon: <Building2 size={24} /> },
    { number: '8+', label: 'Industries Served', icon: <Briefcase size={24} /> },
    { number: '98%', label: 'Client Satisfaction', icon: <Star size={24} /> },
  ];

  const whyChooseUs = [
    {
      icon: <Zap size={24} />,
      title: 'Fast Turnaround',
      description: 'Average first candidate match within 48 hours of engagement.',
    },
    {
      icon: <Target size={24} />,
      title: 'Industry Expertise',
      description: 'Deep understanding of technical and industrial recruitment needs.',
    },
    {
      icon: <Shield size={24} />,
      title: 'Confidential Process',
      description: 'Discreet headhunting for sensitive positions and executive roles.',
    },
    {
      icon: <Users size={24} />,
      title: 'Vetted Candidates',
      description: '100% of candidates go through rigorous screening and verification.',
    },
    {
      icon: <Globe size={24} />,
      title: 'North America Coverage',
      description: 'Recruiting across Canada and the United States.',
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Data-Driven Matching',
      description: 'Advanced analytics to find the perfect candidate-role fit.',
    },
  ];

  const team = [
    {
      name: 'Sarah Mitchell',
      role: 'Founder & CEO',
      image: '/team/sarah.jpg',
      bio: '15+ years in technical recruitment',
    },
    {
      name: 'Michael Chen',
      role: 'Director of Operations',
      image: '/team/michael.jpg',
      bio: 'Former manufacturing executive',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Senior Recruiter',
      image: '/team/emily.jpg',
      bio: 'Specialist in electrical trades',
    },
    {
      name: 'David Thompson',
      role: 'Client Relations Manager',
      image: '/team/david.jpg',
      bio: '10+ years in B2B partnerships',
    },
  ];

  const getValueColors = (color: string) => {
    const colors: Record<string, { bg: string; icon: string; border: string }> = {
      emerald: {
        bg: 'bg-emerald-500/10',
        icon: 'text-emerald-400',
        border: 'border-emerald-500/20 hover:border-emerald-500/40',
      },
      blue: {
        bg: 'bg-blue-500/10',
        icon: 'text-blue-400',
        border: 'border-blue-500/20 hover:border-blue-500/40',
      },
      rose: {
        bg: 'bg-rose-500/10',
        icon: 'text-rose-400',
        border: 'border-rose-500/20 hover:border-rose-500/40',
      },
      amber: {
        bg: 'bg-amber-500/10',
        icon: 'text-amber-400',
        border: 'border-amber-500/20 hover:border-amber-500/40',
      },
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            ref={heroRef}
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-6">
              <Award size={16} />
              About TalentConnectors
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-heading">
              Connecting{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Exceptional Talent
              </span>{' '}
              with Industry Leaders
            </h1>

            {/* Subtitle */}
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
              TalentConnectors is a specialist recruitment.
              We partner with ambitious companies across Canada and the USA to build high-impact
              teams in technical, industrial, and leadership roles.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 active:scale-95"
              >
                View Open Positions
                <ArrowRight size={20} />
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-95"
              >
                Partner With Us
              </a>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* Our Story Section */}
      <section className="relative py-20 md:py-32">
        <div className="container-custom relative z-10">
          <div
            ref={storyRef}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Left - Image/Visual */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur-3xl" />

                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10">
                  {/* SVG Illustration */}
                  <svg
                    viewBox="0 0 400 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                  >
                    <defs>
                      <linearGradient id="storyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>

                    {/* Background Circle */}
                    <circle cx="200" cy="150" r="120" fill="url(#storyGradient)" opacity="0.1" />

                    {/* Building */}
                    <rect x="150" y="80" width="100" height="140" fill="#1e293b" stroke="#10b981" strokeWidth="2" rx="4" />
                    <rect x="165" y="95" width="20" height="20" fill="#10b981" opacity="0.3" rx="2" />
                    <rect x="195" y="95" width="20" height="20" fill="#10b981" opacity="0.3" rx="2" />
                    <rect x="165" y="125" width="20" height="20" fill="#10b981" opacity="0.3" rx="2" />
                    <rect x="195" y="125" width="20" height="20" fill="#10b981" opacity="0.3" rx="2" />
                    <rect x="165" y="155" width="20" height="20" fill="#10b981" opacity="0.3" rx="2" />
                    <rect x="195" y="155" width="20" height="20" fill="#10b981" opacity="0.3" rx="2" />
                    <rect x="185" y="185" width="30" height="35" fill="#0f172a" rx="2" />

                    {/* People Icons */}
                    <g transform="translate(80, 160)">
                      <circle cx="20" cy="15" r="12" fill="#3b82f6" />
                      <circle cx="20" cy="8" r="6" fill="#1e293b" />
                      <path d="M8 22 Q8 15 20 15 Q32 15 32 22" fill="#1e293b" />
                    </g>
                    <g transform="translate(280, 160)">
                      <circle cx="20" cy="15" r="12" fill="#f59e0b" />
                      <circle cx="20" cy="8" r="6" fill="#1e293b" />
                      <path d="M8 22 Q8 15 20 15 Q32 15 32 22" fill="#1e293b" />
                    </g>

                    {/* Connection Lines */}
                    <path d="M100 175 Q125 150 150 165" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,4" fill="none">
                      <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
                    </path>
                    <path d="M300 175 Q275 150 250 165" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" fill="none">
                      <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
                    </path>

                    {/* Handshake Icon */}
                    <g transform="translate(175, 240)">
                      <circle cx="25" cy="15" r="20" fill="#10b981" opacity="0.2" />
                      <path d="M15 15 L25 20 L35 10" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round" />
                    </g>
                  </svg>
                </div>

                {/* Floating Badge */}
                {/* <motion.div
                  className="absolute -bottom-4 -right-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 shadow-xl shadow-emerald-500/25"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={storyInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="text-3xl font-bold text-white">2019</div>
                  <div className="text-emerald-100 text-sm">Founded</div>
                </motion.div> */}
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-medium mb-4">
                Our Story
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight font-heading">
                Built by Recruiters,{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  for Industry
                </span>
              </h2>

              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  TalentConnectors was founded with a simple mission: to bridge the gap between
                  exceptional technical talent and the companies that need them. We saw an industry
                  filled with generic recruiters who didn't understand the nuances of technical
                  and industrial roles.
                </p>
                <p>
                  Our team brings decades of combined experience in manufacturing, engineering,
                  and skilled trades. We speak your language, understand your challenges, and
                  know exactly what it takes to find candidates who will thrive in demanding
                  technical environments.
                </p>
                <p>
                  Today, we're proud to be a trusted recruitment partner for companies across
                  North America, from growing startups to Fortune 500 enterprises.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                  <MapPin size={20} className="text-emerald-400" />
                  <div>
                    <div className="text-white font-semibold text-sm">Surrey</div>
                    <div className="text-gray-500 text-xs">BC, Canada</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                  <Globe size={20} className="text-blue-400" />
                  <div>
                    <div className="text-white font-semibold text-sm">Coverage</div>
                    <div className="text-gray-500 text-xs">Canada & USA</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 md:py-20">
        <div className="container-custom relative z-10">
          <motion.div
            ref={statsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 md:py-32">
        <div className="container-custom relative z-10">
          <motion.div
            ref={valuesRef}
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-6">
              <Heart size={16} />
              Our Values
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight font-heading">
              What{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Drives Us
              </span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              Our core values guide every interaction, every placement, and every relationship we build.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const colors = getValueColors(value.color);
              return (
                <motion.div
                  key={index}
                  className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 ${colors.border} transition-all duration-300 hover:-translate-y-2`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div
                    className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 ${colors.icon} group-hover:scale-110 transition-transform duration-300`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-gray-800/50 to-transparent">
        <div className="container-custom relative z-10">
          <motion.div
            ref={whyRef}
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
              <Award size={16} />
              Why Choose Us
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight font-heading">
              The TalentConnectors{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Advantage
              </span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              What sets us apart from other recruitment agencies in the technical and industrial space.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                className="group flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={whyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index }}
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     
      {/* CTA Section */}
      <section className="relative py-20 md:py-32">
        <div className="container-custom relative z-10">
          <motion.div
            className="relative bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-3xl p-8 md:p-16 text-center overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight font-heading">
                Ready to Work With Us?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Whether you're looking to hire top technical talent or seeking your next career opportunity,
                we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/jobs"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 active:scale-95"
                >
                  <Briefcase size={20} />
                  Browse Jobs
                </Link>
                <Link
                  to="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-95"
                >
                  Contact Us
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compliance Statement */}
      <section className="relative py-12 border-t border-white/10">
        <div className="container-custom relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <CheckCircle size={16} className="text-emerald-400" />
              <span className="text-gray-400 text-sm">We never charge candidates</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <CheckCircle size={16} className="text-blue-400" />
              <span className="text-gray-400 text-sm">Permanent placements only</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <CheckCircle size={16} className="text-amber-400" />
              <span className="text-gray-400 text-sm">Confidential & ethical</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;