// src/components/CookieConsent.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    timestamp: '',
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    if (!savedConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      const parsed = JSON.parse(savedConsent);
      setPreferences(parsed);
      // Check if consent is older than 6 months
      const consentDate = new Date(parsed.timestamp);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      if (consentDate < sixMonthsAgo) {
        setShowBanner(true);
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    const updatedPrefs = { ...prefs, timestamp: new Date().toISOString() };
    localStorage.setItem('cookieConsent', JSON.stringify(updatedPrefs));
    setPreferences(updatedPrefs);
    setShowBanner(false);
    setShowPreferences(false);

    // Initialize scripts based on preferences
    if (updatedPrefs.analytics) {
      // Initialize Google Analytics
      console.log('Analytics enabled');
    }
    if (updatedPrefs.marketing) {
      // Initialize marketing pixels
      console.log('Marketing enabled');
    }
  };

  const acceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: '',
    });
  };

  const rejectNonEssential = () => {
    savePreferences({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: '',
    });
  };

  return (
    <>
      {/* Cookie Banner */}
      <AnimatePresence>
        {showBanner && !showPreferences && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 p-4"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="container-custom">
              <div className="bg-gray-900/95 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  {/* Icon & Text */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Cookie size={24} className="text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">We Value Your Privacy</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        We use cookies to enhance your browsing experience, analyze site
                        traffic, and support marketing efforts. You can change your settings
                        at any time.{' '}
                        <Link
                          to="/privacy"
                          className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                        >
                          View our Privacy Policy
                        </Link>
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <button
                      onClick={() => setShowPreferences(true)}
                      className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 text-gray-400 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <Settings size={16} />
                      Manage
                    </button>
                    <button
                      onClick={rejectNonEssential}
                      className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 text-white border border-white/20 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                    >
                      Reject Non-Essential
                    </button>
                    <button
                      onClick={acceptAll}
                      className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg text-sm font-semibold shadow-lg shadow-emerald-500/20 hover:from-emerald-600 hover:to-teal-700 transition-all"
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {showPreferences && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreferences(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-50"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden h-full md:h-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                      <Settings size={20} className="text-amber-400" />
                    </div>
                    <h3 className="text-white font-bold text-lg">Cookie Preferences</h3>
                  </div>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                               {/* Content */}
                <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                  {/* Essential */}
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Shield size={18} className="text-emerald-400" />
                        <h4 className="text-white font-semibold">Essential Cookies</h4>
                      </div>
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                        Always On
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Required for the website to function properly. Cannot be disabled.
                    </p>
                  </div>

                  {/* Analytics */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                        <h4 className="text-white font-semibold">Analytics Cookies</h4>
                      </div>
                      <button
                        onClick={() =>
                          setPreferences((prev) => ({
                            ...prev,
                            analytics: !prev.analytics,
                          }))
                        }
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          preferences.analytics ? 'bg-emerald-500' : 'bg-gray-700'
                        }`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            preferences.analytics ? 'left-7' : 'left-1'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Help us understand how visitors interact with our website (e.g., Google
                      Analytics).
                    </p>
                  </div>

                  {/* Marketing */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-purple-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                          />
                        </svg>
                        <h4 className="text-white font-semibold">Marketing Cookies</h4>
                      </div>
                      <button
                        onClick={() =>
                          setPreferences((prev) => ({
                            ...prev,
                            marketing: !prev.marketing,
                          }))
                        }
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          preferences.marketing ? 'bg-emerald-500' : 'bg-gray-700'
                        }`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            preferences.marketing ? 'left-7' : 'left-1'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Used to deliver relevant advertisements (e.g., LinkedIn, Meta pixels).
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={rejectNonEssential}
                    className="flex-1 px-4 py-2.5 text-gray-400 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/5 hover:text-white transition-colors"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={() => savePreferences(preferences)}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg text-sm font-semibold shadow-lg shadow-emerald-500/20 hover:from-emerald-600 hover:to-teal-700 transition-all"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;