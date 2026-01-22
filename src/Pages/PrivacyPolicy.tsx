// src/pages/PrivacyPolicy.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  Mail,
  Lock,
  Database,
  Eye,
  Trash2,
  FileText,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Globe,
} from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    { id: 'scope', title: '1. Scope' },
    { id: 'information', title: '2. Information We Collect' },
    { id: 'purpose', title: '3. Purpose of Collection' },
    { id: 'consent', title: '4. Consent' },
    { id: 'disclosure', title: '5. Disclosure of Information' },
    { id: 'security', title: '6. Data Storage & Security' },
    { id: 'retention', title: '7. Data Retention' },
    { id: 'rights-canada', title: '8. Individual Rights (PIPEDA)' },
    { id: 'rights-california', title: '9. California Privacy Rights (CCPA)' },
    { id: 'third-party', title: '10. Third-Party Services' },
    { id: 'updates', title: '11. Policy Updates' },
    { id: 'contact', title: '12. Contact Information' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
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
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Shield size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Privacy Policy
                </h1>
                <p className="text-gray-400 text-sm">
                  TalentConnectors – A recruitment brand operated by Yoursoft Digital Inc.
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
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Sidebar Navigation */}
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
                    className="block text-gray-400 text-sm hover:text-emerald-400 transition-colors py-1"
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
              {/* Introduction */}
              <div className="mb-10 pb-10 border-b border-white/10">
                <p className="text-gray-300 leading-relaxed">
                  This Privacy Policy explains how TalentConnectors ("we," "us," or "our"),
                  operated by Yoursoft Digital Inc., collects, uses, discloses, and safeguards
                  personal information in accordance with the Personal Information Protection
                  and Electronic Documents Act (PIPEDA) and, where applicable, the California
                  Consumer Privacy Act (CCPA).
                </p>
              </div>

              {/* Section 1: Scope */}
              <section id="scope" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">
                    1
                  </span>
                  Scope
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  This Policy applies to all users, candidates, and clients who access
                  TalentConnectors.ca or submit information through our website, email, or
                  other communication channels.
                </p>
              </section>

              {/* Section 2: Information We Collect */}
              <section id="information" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">
                    2
                  </span>
                  Information We Collect
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  We may collect the following categories of personal information:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      icon: <FileText size={16} />,
                      title: 'Identifiers',
                      desc: 'Name, email address, phone number',
                    },
                    {
                      icon: <Database size={16} />,
                      title: 'Professional Information',
                      desc: 'Resume/CV, work history, education, skills, LinkedIn profile',
                    },
                    {
                      icon: <Globe size={16} />,
                      title: 'Business Information (for clients)',
                      desc: 'Company name, role requirements',
                    },
                    {
                      icon: <Eye size={16} />,
                      title: 'Technical Data',
                      desc: 'IP address, browser type, device information (via cookies)',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">{item.title}</h4>
                        <p className="text-gray-500 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 3: Purpose of Collection */}
              <section id="purpose" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">
                    3
                  </span>
                  Purpose of Collection
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  We collect personal information for the following purposes:
                </p>
                <ul className="space-y-2">
                  {[
                    'To evaluate candidate suitability',
                    'To communicate about job opportunities',
                    'To present candidate profiles to employers with consent',
                    'To provide recruitment services',
                    'To improve our website and services',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-400">
                      <CheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Section 4: Consent */}
              <section id="consent" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">
                    4
                  </span>
                  Consent
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  By submitting your information, you consent to its collection and use as
                  outlined in this Policy. You may withdraw consent at any time by contacting{' '}
                  <a
                    href="mailto:privacy@talentconnectors.ca"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    privacy@talentconnectors.ca
                  </a>
                  .
                </p>
              </section>

              {/* Section 5: Disclosure */}
              <section id="disclosure" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">
                    5
                  </span>
                  Disclosure of Information
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  We may disclose personal information to:
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Hiring employers (with candidate consent)',
                    'Authorized internal staff',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-400">
                      <CheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-400 leading-relaxed mb-4">
                  We do <span className="text-white font-medium">NOT</span>:
                </p>
                <ul className="space-y-2">
                  {[
                    'Sell personal information',
                    'Rent or trade personal information',
                    'Share information without lawful purpose or consent',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-400">
                      <XCircle size={16} className="text-red-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Section 6: Security */}
              <section id="security" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">
                    6
                  </span>
                  Data Storage & Security
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  We implement reasonable administrative, technical, and physical safeguards
                  including:
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { icon: <Lock size={20} />, text: 'Encrypted cloud storage' },
                    { icon: <Shield size={20} />, text: 'Restricted access controls' },
                    { icon: <Eye size={20} />, text: 'Periodic security reviews' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl text-center"
                    >
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400">
                        {item.icon}
                      </div>
                      <span className="text-gray-300 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 7: Retention */}
              <section id="retention" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">
                    7
                  </span>
                  Data Retention
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <h4 className="text-blue-400 font-medium mb-1">Candidate Data</h4>
                    <p className="text-gray-400 text-sm">Retained for up to 24 months</p>
                  </div>
                  <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                    <h4 className="text-amber-400 font-medium mb-1">
                      Client Records & Invoices
                    </h4>
                    <p className="text-gray-400 text-sm">Retained for 7 years</p>
                  </div>
                </div>
              </section>

              {/* Section 8: Rights Canada */}
              <section id="rights-canada" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">
                    8
                  </span>
                  Individual Rights (Canada – PIPEDA)
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">You have the right to:</p>
                <ul className="space-y-2">
                  {[
                    'Access your personal information',
                    'Request correction',
                    'Withdraw consent',
                    'Request deletion where legally permissible',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-400">
                      <CheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Section 9: California Rights */}
              <section id="rights-california" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">
                    9
                  </span>
                  California Privacy Rights (CCPA)
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  If you are a California resident, you have the right to:
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Know what personal information we collect, use, and disclose',
                    'Request access to your data',
                    'Request deletion of your data',
                    'Opt-out of sale of personal information (we do NOT sell data)',
                    'Non-discrimination for exercising your rights',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-400">
                      <CheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
                  <h4 className="text-purple-400 font-medium mb-2">To exercise CCPA rights:</h4>
                  <p className="text-gray-400 text-sm">
                    Email:{' '}
                    <a
                      href="mailto:privacy@talentconnectors.ca"
                      className="text-purple-400 hover:text-purple-300"
                    >
                      privacy@talentconnectors.ca
                    </a>
                    <br />
                    Subject: "CCPA Request"
                  </p>
                </div>
              </section>

              {/* Section 10: Third-Party */}
              <section id="third-party" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">
                    10
                  </span>
                  Third-Party Services
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  We may use third-party tools such as:
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Google Analytics', 'LinkedIn Insight Tag'].map((service, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-400 text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 text-sm mt-3">
                  These services may collect data according to their own privacy policies.
                </p>
              </section>

              {/* Section 11: Updates */}
              <section id="updates" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">
                    11
                  </span>
                  Policy Updates
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  We may update this Policy periodically. Continued use of our services
                  constitutes acceptance of changes.
                </p>
              </section>

              {/* Section 12: Contact */}
              <section id="contact" className="scroll-mt-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">
                    12
                  </span>
                  Contact Information
                </h2>
                <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl">
                  <h4 className="text-white font-semibold mb-3">Yoursoft Digital Inc.</h4>
                  <p className="text-gray-400 mb-2">Canada</p>
                  <a
                    href="mailto:privacy@talentconnectors.ca"
                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <Mail size={16} />
                    privacy@talentconnectors.ca
                  </a>
                </div>
              </section>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;