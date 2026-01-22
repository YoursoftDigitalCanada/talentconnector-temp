import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  CheckCircle,
  XCircle,
  Shield,
  Search,
  UserCheck,
  Calendar,
  ArrowRight,
} from 'lucide-react';

const Compliance = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const positiveItems = [
    'We do NOT charge candidates',
    'Recruit for permanent roles only',
    'Candidates paid directly by clients',
    'Recruit for Canada and USA',
  ];

  const negativeItems = [
    'We do NOT manage payroll',
    'We do NOT sponsor visas',
    'No immigration services',
    'No temporary foreign workers',
  ];

  const services = [
    { icon: <Search size={16} />, label: 'Talent Sourcing' },
    { icon: <UserCheck size={16} />, label: 'Candidate Screening' },
    { icon: <Calendar size={16} />, label: 'Interview Coordination' },
  ];

  return (
    <section
      id="compliance"
      className="relative py-16 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-blue-200/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-emerald-200/50 rounded-full blur-3xl" />

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
          className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-xs font-medium mb-4">
              <Shield size={14} />
              Compliance Statement
            </span>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight font-heading">
              Talent Connectors Inc. -{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Recruitment Compliance
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              Talent Connectors Inc. operates as a recruitment consulting and headhunting
              firm supporting hiring in Canada and the United States. We are committed
              to transparent and ethical recruitment practices.
            </p>

            {/* Compliance Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {/* Positive Items */}
              {positiveItems.map((item, index) => (
                <motion.div
                  key={`positive-${index}`}
                  className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors"
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.08 }}
                >
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={16} className="text-emerald-600" />
                  </div>
                  <span className="text-gray-700 text-sm">{item}</span>
                </motion.div>
              ))}

              {/* Negative Items */}
              {negativeItems.map((item, index) => (
                <motion.div
                  key={`negative-${index}`}
                  className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors"
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.08 }}
                >
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <XCircle size={16} className="text-red-600" />
                  </div>
                  <span className="text-gray-700 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Services Section */}
            <motion.div
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <h4 className="text-gray-900 font-semibold text-sm mb-3 flex items-center gap-2">
                <Shield size={14} className="text-blue-600" />
                Our Services Are Limited To:
              </h4>
              <div className="flex flex-wrap gap-2">
                {services.map((service, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-xs font-medium"
                  >
                    {service.icon}
                    {service.label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors"
              >
                Questions about our practices?
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200/50 to-emerald-200/50 rounded-3xl blur-3xl" />

            {/* SVG Container */}
            <div className="relative bg-white border border-gray-200 rounded-3xl p-6 shadow-xl shadow-gray-200/50">
              <svg
                viewBox="0 0 500 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
              >
                <defs>
                  <linearGradient id="shieldGradientLight" x1="150" y1="60" x2="350" y2="320">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                  <linearGradient id="shieldInnerLight" x1="150" y1="60" x2="350" y2="320">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="100%" stopColor="#f1f5f9" />
                  </linearGradient>
                </defs>

                {/* Background Elements */}
                <circle cx="80" cy="80" r="40" fill="#3b82f6" opacity="0.1" />
                <circle cx="420" cy="320" r="50" fill="#10b981" opacity="0.1" />
                <circle cx="400" cy="80" r="30" fill="#f97316" opacity="0.1" />

                {/* Shield - Main Element */}
                <g>
                  <path
                    d="M250 60 L340 95 L340 185 C340 240 305 295 250 320 C195 295 160 240 160 185 L160 95 L250 60Z"
                    fill="url(#shieldGradientLight)"
                    stroke="#e2e8f0"
                    strokeWidth="2"
                  />
                  <path
                    d="M250 80 L320 110 L320 180 C320 225 290 270 250 290 C210 270 180 225 180 180 L180 110 L250 80Z"
                    fill="url(#shieldInnerLight)"
                  />

                  {/* Checkmark inside shield */}
                  <path
                    d="M215 180 L240 205 L290 155"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  >
                    <animate
                      attributeName="stroke-dasharray"
                      from="0,150"
                      to="150,0"
                      dur="1.5s"
                      fill="freeze"
                    />
                  </path>
                </g>

                {/* Document 1 - Left */}
                <g>
                  <rect x="40" y="150" width="70" height="90" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                  <rect x="50" y="165" width="50" height="4" rx="2" fill="#cbd5e1" />
                  <rect x="50" y="175" width="35" height="4" rx="2" fill="#cbd5e1" />
                  <rect x="50" y="185" width="45" height="4" rx="2" fill="#cbd5e1" />
                  <rect x="50" y="205" width="25" height="25" rx="4" fill="#dbeafe" />
                  <path d="M58 217 L63 222 L72 212" stroke="#3b82f6" strokeWidth="2" fill="none" />
                </g>

                {/* Document 2 - Right */}
                <g>
                  <rect x="390" y="120" width="70" height="90" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                  <rect x="400" y="135" width="50" height="4" rx="2" fill="#cbd5e1" />
                  <rect x="400" y="145" width="35" height="4" rx="2" fill="#cbd5e1" />
                  <rect x="400" y="155" width="45" height="4" rx="2" fill="#cbd5e1" />
                  <rect x="400" y="175" width="25" height="25" rx="4" fill="#d1fae5" />
                  <path d="M408 187 L413 192 L422 182" stroke="#10b981" strokeWidth="2" fill="none" />
                </g>

                {/* Canada Flag */}
                <g>
                  <rect x="60" y="280" width="50" height="35" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                  <rect x="60" y="280" width="12" height="35" fill="#ef4444" opacity="0.9" rx="4 0 0 4" />
                  <rect x="98" y="280" width="12" height="35" fill="#ef4444" opacity="0.9" rx="0 4 4 0" />
                  <path d="M85 290 L88 298 L92 290 L88 302 L85 290" fill="#ef4444" />
                </g>

                {/* USA Flag */}
                <g>
                  <rect x="390" y="260" width="50" height="35" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                  <rect x="390" y="260" width="20" height="18" fill="#1e3a5f" rx="4 0 0 0" />
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <rect
                      key={i}
                      x="390"
                      y={260 + i * 5}
                      width="50"
                      height="2.5"
                      fill={i % 2 === 0 ? '#ef4444' : '#f8fafc'}
                      opacity="0.9"
                    />
                  ))}
                  <rect x="390" y="260" width="20" height="18" fill="#1e3a5f" rx="4 0 0 0" />
                </g>

                {/* Connection Lines */}
                <path
                  d="M110 195 Q150 170 180 185"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  opacity="0.6"
                  fill="none"
                >
                  <animate attributeName="stroke-dashoffset" from="16" to="0" dur="2s" repeatCount="indefinite" />
                </path>
                <path
                  d="M390 165 Q350 145 320 160"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  opacity="0.6"
                  fill="none"
                >
                  <animate attributeName="stroke-dashoffset" from="16" to="0" dur="2s" repeatCount="indefinite" />
                </path>

                {/* Floating Checkmarks */}
                <g>
                  <circle cx="420" cy="60" r="16" fill="#d1fae5" />
                  <path d="M412 60 L417 65 L428 54" stroke="#10b981" strokeWidth="2" fill="none" />
                </g>
                <g>
                  <circle cx="70" cy="100" r="14" fill="#dbeafe" />
                  <path d="M63 100 L68 105 L77 95" stroke="#3b82f6" strokeWidth="2" fill="none" />
                </g>

                {/* Lock Icon */}
                <g>
                  <rect x="230" y="340" width="40" height="30" rx="4" fill="#f97316" />
                  <rect x="240" y="328" width="20" height="16" rx="10" fill="none" stroke="#f97316" strokeWidth="3" />
                  <circle cx="250" cy="352" r="4" fill="white" />
                </g>
              </svg>
            </div>

            {/* Floating Badges */}
            <motion.div
              className="absolute -left-4 top-1/4 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <CheckCircle size={16} className="text-emerald-600" />
                </div>
                <span className="text-gray-900 text-xs font-medium">Ethical Practices</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-4 bottom-1/4 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield size={16} className="text-blue-600" />
                </div>
                <span className="text-gray-900 text-xs font-medium">Fully Compliant</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Compliance;