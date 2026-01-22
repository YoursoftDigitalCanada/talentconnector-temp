import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';

// Pages
import HomePage from './Pages/HomePage';
import JobsPage from './Pages/JobsPage';
import JobDetailPage from './Pages/JobDetailPage';
import GeneralApplicationPage from './Pages/GeneralApplicationPage';

// Legal Pages
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsOfService from './Pages/TermsOfService';
import CookiePolicy from './Pages/CookiePolicy';
import DoNotSell from './Pages/DoNotSell';
import AboutPage from './Pages/AboutPage';
// Styles
import './App.css';
import './styles/JobsPage.css';
import './styles/JobDetailPage.css';
import './styles/GeneralApplicationPage.css';

// Component to handle sticky header visibility on job detail page
const StickyHeaderHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const stickyHeader = document.querySelector('.job-detail-sticky-header');
      if (stickyHeader) {
        if (window.scrollY > 400) {
          stickyHeader.classList.add('visible');
        } else {
          stickyHeader.classList.remove('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return null;
};

// Scroll to top on route change
const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="app min-h-screen bg-gray-900">
        <Navbar />
        <StickyHeaderHandler />
        <ScrollToTopOnNavigate />
        
        <main id="main-content">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/apply" element={<GeneralApplicationPage />} />

            {/* Legal Pages */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/do-not-sell" element={<DoNotSell />} />
          </Routes>
        </main>

        <Footer />
        <ScrollToTop />
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;