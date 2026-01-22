import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, FileText, Briefcase } from 'lucide-react';

// ============================================
// LOGO COMPONENT - Talent Connectors Puzzle Logo
// ============================================
const TalentConnectorsLogo = ({ size = 40 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    {/* Top Left - Green piece with puzzle connector */}
    <path
      d="M8 8 L8 42 L28 42 C28 42 28 38 33 38 C38 38 38 42 38 42 L42 42 L42 28 C42 28 46 28 46 23 C46 18 42 18 42 18 L42 8 L8 8 Z"
      fill="#4ADE80"
      rx="4"
    />
    
    {/* Top Right - Cyan piece with puzzle connectors */}
    <path
      d="M58 8 L58 18 C58 18 54 18 54 23 C54 28 58 28 58 28 L58 42 L72 42 C72 42 72 46 77 46 C82 46 82 42 82 42 L92 42 L92 8 L58 8 Z"
      fill="#22D3EE"
      rx="4"
    />
    
    {/* Bottom Left - Yellow piece with puzzle connectors */}
    <path
      d="M8 58 L8 92 L42 92 L42 72 C42 72 38 72 38 67 C38 62 42 62 42 62 L42 58 L28 58 C28 58 28 54 23 54 C18 54 18 58 18 58 L8 58 Z"
      fill="#FBBF24"
      rx="4"
    />
    
    {/* Bottom Right - Orange piece with puzzle connectors */}
    <path
      d="M58 58 L58 62 C58 62 62 62 62 67 C62 72 58 72 58 72 L58 92 L92 92 L92 58 L82 58 C82 58 82 54 77 54 C72 54 72 58 72 58 L58 58 Z"
      fill="#F97316"
      rx="4"
    />
    
    {/* Center connecting dot - Yellow/Orange accent */}
    <circle cx="50" cy="50" r="4" fill="#FBBF24" />
  </svg>
);

// Simplified version for smaller sizes
const TalentConnectorsLogoSimple = ({ size = 40 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    {/* Top Left - Green */}
    <rect x="5" y="5" width="43" height="43" rx="8" fill="#4ADE80" />
    {/* Top Right - Cyan */}
    <rect x="52" y="5" width="43" height="43" rx="8" fill="#22D3EE" />
    {/* Bottom Left - Yellow */}
    <rect x="5" y="52" width="43" height="43" rx="8" fill="#FBBF24" />
    {/* Bottom Right - Orange */}
    <rect x="52" y="52" width="43" height="43" rx="8" fill="#F97316" />
    {/* Center dot */}
    <circle cx="50" cy="50" r="8" fill="white" />
    <circle cx="50" cy="50" r="4" fill="#F97316" />
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', href: '/', isRoute: true },
    { name: 'About', href: '/about', isRoute: true },
    { name: 'Services', href: '/#services', isRoute: false },
    { name: 'Jobs', href: '/jobs', isRoute: true },
    { name: 'Contact', href: '/#contact', isRoute: false },
  ];

  const handleNavClick = (link: { name: string; href: string; isRoute: boolean }, e: React.MouseEvent) => {
    if (!link.isRoute) {
      e.preventDefault();
      
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(link.href.replace('/', ''));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.querySelector(link.href.replace('/', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (link: { name: string; href: string; isRoute: boolean }) => {
    if (link.isRoute) {
      if (link.href === '/') {
        return location.pathname === '/';
      }
      return location.pathname.startsWith(link.href);
    }
    return false;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${
        isScrolled
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-hidden">
        {/* Logo - Updated with Talent Connectors Puzzle Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative"
          >
            <TalentConnectorsLogoSimple size={44} />
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4ADE80]/20 via-[#22D3EE]/20 to-[#F97316]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white leading-tight">
              Talent
            </span>
            <span className="text-xl font-extrabold text-white leading-tight -mt-1">
              Connectors
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.isRoute ? (
                <Link
                  to={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActiveLink(link)
                      ? 'bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] text-white shadow-md shadow-[#4ADE80]/25'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="px-4 py-2 rounded-lg font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
                  onClick={(e) => handleNavClick(link, e)}
                >
                  {link.name}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA Buttons - Updated with logo colors */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/apply"
            className="flex items-center gap-2 px-4 py-2 border-2 border-[#22D3EE] text-[#22D3EE] rounded-xl font-semibold hover:bg-[#22D3EE] hover:text-white transition-all duration-200"
          >
            <FileText size={18} />
            Submit Resume
          </Link>
          <Link
            to="/jobs"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] text-white rounded-xl font-semibold hover:from-[#22C55E] hover:to-[#06B6D4] transition-all duration-200 shadow-md shadow-[#4ADE80]/25"
          >
            <Briefcase size={18} />
            View Jobs
          </Link>
        </div>

        {/* Mobile Menu Button - Updated with logo colors */}
        <button
          className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-5 h-0.5 bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] rounded"
          />
          <motion.span
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-5 h-0.5 bg-gradient-to-r from-[#22D3EE] to-[#FBBF24] rounded"
          />
          <motion.span
            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-5 h-0.5 bg-gradient-to-r from-[#FBBF24] to-[#F97316] rounded"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel - Updated with logo colors */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-900 border-l border-[#22D3EE]/20 z-50 lg:hidden shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="flex flex-col h-full p-6">
                {/* Header with Logo */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <TalentConnectorsLogoSimple size={32} />
                    <span className="text-white font-bold">Menu</span>
                  </div>
                  <button
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Mobile Nav Links - Updated with logo colors */}
                <div className="flex flex-col gap-2 flex-1">
                  {navLinks.map((link, index) => {
                    // Cycle through logo colors for each link
                    const colors = ['#4ADE80', '#22D3EE', '#FBBF24', '#F97316'];
                    const accentColor = colors[index % colors.length];
                    
                    return link.isRoute ? (
                      <Link
                        key={link.name}
                        to={link.href}
                        className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 ${
                          isActiveLink(link)
                            ? 'bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] text-white'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: accentColor }}
                        />
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        key={link.name}
                        href={link.href}
                        className="px-4 py-3 rounded-xl font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center gap-3"
                        onClick={(e) => handleNavClick(link, e)}
                      >
                        <span 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: accentColor }}
                        />
                        {link.name}
                      </a>
                    );
                  })}
                  
                  {/* General Application Link - Updated with logo colors */}
                  <Link
                    to="/apply"
                    className="flex items-center gap-3 px-4 py-3 mt-4 bg-gradient-to-r from-[#FBBF24] to-[#F97316] text-white rounded-xl font-semibold hover:from-[#F59E0B] hover:to-[#EA580C] transition-all duration-200"
                  >
                    <FileText size={18} />
                    General Application
                  </Link>
                </div>

                {/* Mobile CTA - Updated with logo colors */}
                <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
                  <a
                    href="tel:+18005550199"
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#22D3EE]/50 text-[#22D3EE] rounded-xl font-semibold hover:bg-[#22D3EE]/10 transition-all duration-200"
                  >
                    <Phone size={18} />
                    Call Us
                  </a>
                  <Link
                    to="/jobs"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] text-white rounded-xl font-semibold hover:from-[#22C55E] hover:to-[#06B6D4] transition-all duration-200 shadow-md"
                  >
                    <Briefcase size={18} />
                    View Jobs
                  </Link>
                </div>

                {/* Footer Branding */}
                <div className="pt-6 mt-6 border-t border-white/10">
                  <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                    <TalentConnectorsLogoSimple size={20} />
                    <span>© {new Date().getFullYear()} Talent Connectors</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;