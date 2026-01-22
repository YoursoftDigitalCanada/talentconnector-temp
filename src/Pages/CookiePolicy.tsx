// src/pages/CookiePolicy.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Cookie,
  ArrowLeft,
  Settings,
  BarChart3,
  Megaphone,
  Mail,
  Clock,
  CheckCircle,
} from 'lucide-react';

const CookiePolicy = () => {
  const cookieTypes = [
    {
      icon: <Settings size={20} />,
      name: 'Essential Cookies',
      description: 'Required for website functionality. Cannot be disabled.',
      color: 'emerald',
      required: true,
    },
    {
      icon: <BarChart3 size={20} />,
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website.',
      color: 'blue',
      required: false,
    },
    {
      icon: <Megaphone size={20} />,
      name: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements.',
      color: 'purple',
      required: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-white/10">
        <div className="container-custom py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Cookie size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Cookie Policy
                </h1>
                <p className="text-gray-400 text-sm">
                  How we use cookies on TalentConnectors
                </p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              <Clock size={14} className="inline mr-1" />
              Last Updated: January 18, 2025
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom relative z-10 py-12">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10">
            {/* What Are Cookies */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-white mb-4">1. What Are Cookies</h2>
              <p className="text-gray-400 leading-relaxed">
                Cookies are small text files stored on your device when you visit a
                website. They help the website remember information about your visit.
              </p>
            </section>

            {/* Types of Cookies */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-white mb-4">
                2. Types of Cookies We Use
              </h2>
              <div className="space-y-4">
                {cookieTypes.map((cookie, index) => (
                  <div
                    key={index}
                    className={`p-4 bg-${cookie.color}-500/5 border border-${cookie.color}-500/20 rounded-xl`}
                    style={{
                      backgroundColor: `rgba(var(--${cookie.color}-500), 0.05)`,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 bg-${cookie.color}-500/20 rounded-lg flex items-center justify-center text-${cookie.color}-400 flex-shrink-0`}
                      >
                        {cookie.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-semibold">{cookie.name}</h3>
                          {cookie.required && (
                            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">{cookie.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Purpose */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-white mb-4">3. Purpose</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Cookies help us:
              </p>
              <ul className="space-y-2">
                {['Improve user experience', 'Analyze traffic patterns'].map(
                  (item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-400">
                      <CheckCircle size={16} className="text-emerald-400" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </section>

            {/* Managing Cookies */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-white mb-4">4. Managing Cookies</h2>
              <p className="text-gray-400 leading-relaxed">
                You may disable cookies through your browser settings. Note that
                disabling essential cookies may affect website functionality.
              </p>
            </section>

            {/* Third-Party Cookies */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-white mb-4">5. Third-Party Cookies</h2>
              <p className="text-gray-400 leading-relaxed mb-4">We may use:</p>
              <div className="flex flex-wrap gap-2">
                {['Google Analytics', 'LinkedIn tracking tools'].map((service, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-400 text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </section>

            {/* Consent */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-white mb-4">6. Consent</h2>
              <p className="text-gray-400 leading-relaxed">
                By continuing to use our website, you consent to our cookie use.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">7. Contact</h2>
              <a
                href="mailto:privacy@talentconnectors.ca"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <Mail size={16} />
                privacy@talentconnectors.ca
              </a>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicy;