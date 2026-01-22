import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Twitter,
  Facebook,
  MessageSquare,
  Clock,
  CheckCircle,
  Loader2,
} from 'lucide-react';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: '',
    message: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        inquiryType: '',
        message: '',
        consent: false,
      });
    }, 5000);
  };

  const contactMethods = [
    {
      icon: <Mail size={22} />,
      title: 'Email Us',
      value: 'info@talentconnectors.com',
      link: 'mailto:info@talentconnectors.com',
      color: 'emerald',
    },
  
    {
      icon: <MapPin size={22} />,
      title: 'Headquarters',
      value: 'Surrey, BC, Canada',
      link: null,
      color: 'amber',
    },
    {
      icon: <Clock size={22} />,
      title: 'Business Hours',
      value: 'Mon-Fri: 8AM - 6PM EST',
      link: null,
      color: 'purple',
    },
  ];

  const socialLinks = [
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
  ];

  const getMethodColors = (color: string) => {
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
      amber: {
        bg: 'bg-amber-500/10',
        icon: 'text-amber-400',
        border: 'border-amber-500/20 hover:border-amber-500/40',
      },
      purple: {
        bg: 'bg-purple-500/10',
        icon: 'text-purple-400',
        border: 'border-purple-500/20 hover:border-purple-500/40',
      },
    };
    return colors[color] || colors.emerald;
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div
          ref={ref}
          className="grid lg:grid-cols-5 gap-10 lg:gap-16"
        >
          {/* Left - Contact Info (2 cols) */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-6">
              <MessageSquare size={16} />
              Contact Us
            </span>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight font-heading">
              Let's Find Your{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Next Great Hire
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Whether you're looking to hire skilled technicians or you're a
              professional seeking new opportunities, we'd love to hear from you.
              Get in touch today.
            </p>

            {/* Contact Methods */}
            <div className="space-y-4 mb-8">
              {contactMethods.map((method, index) => {
                const colors = getMethodColors(method.color);
                return (
                  <motion.div
                    key={index}
                    className={`group flex items-center gap-4 p-4 bg-white/5 border ${colors.border} rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <div
                      className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center ${colors.icon} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {method.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-0.5">
                        {method.title}
                      </h4>
                      {method.link ? (
                        <a
                          href={method.link}
                          className="text-gray-400 text-sm hover:text-emerald-400 transition-colors"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-gray-400 text-sm">{method.value}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Social Links */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <h4 className="text-white font-semibold text-sm mb-3">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div> */}
          </motion.div>

          {/* Right - Contact Form (3 cols) */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
              {isSubmitted ? (
                // Success State
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                    <CheckCircle size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-400">
                    Thank you for contacting us. We'll get back to you within 24
                    hours.
                  </p>
                </motion.div>
              ) : (
                // Form
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Last Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                      />
                    </div>
                 
                      
                  </div>

                  {/* Company & Inquiry Type Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="inquiryType"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Inquiry Type <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 0.75rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.5em 1.5em',
                        }}
                      >
                        <option value="" className="bg-gray-800">
                          Select an option
                        </option>
                        <option value="employer" className="bg-gray-800">
                          I'm an Employer - Need to Hire
                        </option>
                        <option value="candidate" className="bg-gray-800">
                          I'm a Candidate - Looking for Jobs
                        </option>
                        <option value="partnership" className="bg-gray-800">
                          Partnership Inquiry
                        </option>
                        <option value="general" className="bg-gray-800">
                          General Question
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your hiring needs or the type of position you're looking for..."
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      required
                      className="w-5 h-5 mt-0.5 bg-white/5 border border-white/20 rounded text-emerald-500 focus:ring-emerald-500/20 focus:ring-2 cursor-pointer"
                    />
                    <label
                      htmlFor="consent"
                      className="text-gray-400 text-sm leading-relaxed cursor-pointer"
                    >
                      I agree to the{' '}
                      <a
                        href="/privacy"
                        className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                      >
                        Privacy Policy
                      </a>{' '}
                      and consent to being contacted about recruitment
                      opportunities. We will never share your information with
                      third parties.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;