// src/pages/TermsOfService.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileText,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Scale,
  Clock,
} from 'lucide-react';

const TermsOfService = () => {
  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'services', title: '2. Services' },
    { id: 'obligations', title: '3. User Obligations' },
    { id: 'fees', title: '4. Fees' },
    { id: 'disclaimer', title: '5. Disclaimer' },
    { id: 'ip', title: '6. Intellectual Property' },
    { id: 'liability', title: '7. Limitation of Liability' },
    { id: 'law', title: '8. Governing Law' },
    { id: 'amendments', title: '9. Amendments' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
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
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <FileText size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Terms of Service
                </h1>
                <p className="text-gray-400 text-sm">
                  TalentConnectors – A recruitment brand operated by Yoursoft Digital Inc.
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
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Sidebar */}
          <motion.aside
            className="hidden lg:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="sticky top-24 bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-semibold mb-4 text-sm">
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-gray-400 text-sm hover:text-blue-400 transition-colors py-1"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.main
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10">
              {/* Section 1 */}
              <section id="acceptance" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-sm">
                    1
                  </span>
                  Acceptance of Terms
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  By accessing TalentConnectors.ca, you agree to be bound by these Terms.
                </p>
              </section>

              {/* Section 2 */}
              <section id="services" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-sm">
                    2
                  </span>
                  Services
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  TalentConnectors provides recruitment consulting and headhunting services
                  only.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                    <h4 className="text-red-400 font-medium mb-2 text-sm">We do NOT:</h4>
                    <ul className="space-y-2">
                      {[
                        'Charge candidates',
                        'Provide immigration or visa services',
                        'Employ candidates',
                      ].map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-gray-400 text-sm"
                        >
                          <XCircle size={14} className="text-red-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <h4 className="text-emerald-400 font-medium mb-2 text-sm">We DO:</h4>
                    <ul className="space-y-2">
                      {[
                        'Provide recruitment consulting',
                        'Headhunt qualified candidates',
                        'Connect talent with employers',
                      ].map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-gray-400 text-sm"
                        >
                          <CheckCircle size={14} className="text-emerald-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="obligations" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-sm">
                    3
                  </span>
                  User Obligations
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">Users agree to:</p>
                <ul className="space-y-2">
                  {[
                    'Provide accurate information',
                    'Not submit false resumes',
                    'Not misuse the website',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-400">
                      <CheckCircle size={16} className="text-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Section 4 */}
              <section id="fees" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-sm">
                    4
                  </span>
                  Fees
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <CheckCircle size={20} className="text-emerald-400 mb-2" />
                    <h4 className="text-white font-medium mb-1">For Employers</h4>
                    <p className="text-gray-400 text-sm">
                      All recruitment fees are paid by employers
                    </p>
                  </div>
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <CheckCircle size={20} className="text-blue-400 mb-2" />
                    <h4 className="text-white font-medium mb-1">For Candidates</h4>
                    <p className="text-gray-400 text-sm">Candidates are never charged</p>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section id="disclaimer" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-sm">
                    5
                  </span>
                  Disclaimer
                </h2>
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-400 leading-relaxed">
                        TalentConnectors does not guarantee employment and is not responsible
                        for hiring outcomes.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section id="ip" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-sm">
                    6
                  </span>
                  Intellectual Property
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  All website content is owned by Yoursoft Digital Inc. and may not be
                  copied without permission.
                </p>
              </section>

              {/* Section 7 */}
              <section id="liability" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-sm">
                    7
                  </span>
                  Limitation of Liability
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  We shall not be liable for:
                </p>
                <ul className="space-y-2">
                  {['Hiring decisions', 'Employment outcomes', 'Third-party actions'].map(
                    (item, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-400">
                        <XCircle size={16} className="text-gray-600" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </section>

              {/* Section 8 */}
              <section id="law" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-sm">
                    8
                  </span>
                  Governing Law
                </h2>
                <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl flex items-center gap-3">
                  <Scale size={20} className="text-purple-400" />
                  <p className="text-gray-400">
                    These Terms are governed by the laws of British Columbia, Canada.
                  </p>
                </div>
              </section>

              {/* Section 9 */}
              <section id="amendments" className="scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-sm">
                    9
                  </span>
                  Amendments
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  We reserve the right to modify these Terms at any time.
                </p>
              </section>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;