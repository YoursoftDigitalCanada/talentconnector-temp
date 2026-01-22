// src/pages/DoNotSell.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldOff,
  ArrowLeft,
  Mail,
  CheckCircle,
  UserCheck,
  Clock,
} from 'lucide-react';

const DoNotSell = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
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
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20">
                <ShieldOff size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Do Not Sell My Data
                </h1>
                <p className="text-gray-400 text-sm">
                  California Consumer Privacy Act (CCPA) Compliance
                </p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              <Clock size={14} className="inline mr-1" />
              Effective Date: January 18, 2025
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
          {/* Important Notice */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle size={24} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2">Our Policy</h3>
                <p className="text-gray-300">
                  TalentConnectors <strong className="text-emerald-400">does not sell</strong>{' '}
                  personal information. We also do not rent or trade your data.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10">
            {/* Your Rights */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-white mb-4">Your Rights</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                If you are a California resident, you have the right to:
              </p>
              <ul className="space-y-3">
                {[
                  'Know what personal data we collect',
                  'Request access to your personal information',
                  'Request deletion of your personal information',
                  'Opt-out of the sale of personal information',
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl text-gray-300"
                  >
                    <CheckCircle size={18} className="text-emerald-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* How to Submit */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-white mb-4">
                How to Submit a Request
              </h2>
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Mail size={20} className="text-blue-400" />
                  <a
                    href="mailto:privacy@talentconnectors.ca"
                    className="text-blue-400 hover:text-blue-300 font-medium"
                  >
                    privacy@talentconnectors.ca
                  </a>
                </div>
                <p className="text-gray-400 mb-4">
                  Subject: "Do Not Sell My Data – CCPA Request"
                </p>
                <p className="text-gray-400 text-sm mb-3">Please include:</p>
                <ul className="space-y-2">
                  {[
                    'Your full name',
                    'Email address used on our site',
                    'Request type (Access / Delete / Opt-out)',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-400 text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                We will verify your identity and respond within the legally required
                timeframe.
              </p>
            </section>

            {/* Authorized Agent */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Authorized Agent</h2>
              <div className="flex items-start gap-4 p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
                <UserCheck size={20} className="text-purple-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-400">
                  You may designate an authorized agent to submit a request on your
                  behalf. Proof of authorization will be required.
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DoNotSell;