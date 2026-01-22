import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Play, Zap, Target, Shield, Cpu, GitBranch, Server } from 'lucide-react';

const Hero = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center overflow-x-hidden overflow-y-visible bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 lg:pt-16"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animated Gradient Shapes - Smaller */}
        <div className="absolute top-[-15%] right-[-8%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-15%] left-[-8%] w-[350px] h-[350px] rounded-full bg-gradient-to-br from-amber-500/15 to-orange-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[40%] left-[30%] w-[200px] h-[200px] rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-transparent to-gray-900/80" />
      </div>

     <div className="container-custom relative z-10 py-12 hero-lg-spacing">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Canadian Badge - Smaller */}
            <motion.div 
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-4"
              variants={itemVariants}
            >
              <span className="text-lg">🍁</span>
              <span className="text-white/90 font-medium text-xs">Proudly Canadian</span>
            </motion.div>

            {/* Title - Smaller */}
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight font-heading"
              variants={itemVariants}
            >
              Expert Recruitment for
              <span className="block mt-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Technical & Industrial
              </span>
              Talent
            </motion.h1>

            {/* Subtitle - Smaller */}
            <motion.p 
              className="text-base md:text-lg text-gray-300 mb-6 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              variants={itemVariants}
            >
              TalentConnectors specializes in Manufacturing, Engineering, Skill Trades and Information Technology recruitment. Our primary objective is to develop careers at every level while helping companies build high-impact teams.
            </motion.p>

            {/* CTA Buttons - Smaller */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8"
              variants={itemVariants}
            >
              <a
                href="#jobs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 active:scale-95"
              >
                Browse Open Positions
                <ArrowRight size={18} />
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold text-sm rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 active:scale-95"
              >
                <Play size={18} />
                Learn How We Work
              </a>
            </motion.div>

            {/* Stats - Smaller */}
            <motion.div 
              className="grid grid-cols-3 gap-3 md:gap-6"
              variants={itemVariants}
            >
              {/* Stat 1 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 md:p-4 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mb-2 mx-auto lg:mx-0">
                    <Zap size={16} className="text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-0.5">
                    81<span className="text-sm md:text-base text-emerald-400">%</span>
                  </div>
                  <div className="text-xs text-gray-400">Improved Efficiency</div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 md:p-4 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mb-2 mx-auto lg:mx-0">
                    <Target size={16} className="text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-0.5">
                    6<span className="text-sm md:text-base text-amber-400">+</span>
                  </div>
                  <div className="text-xs text-gray-400">STEM Disciplines</div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 md:p-4 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mb-2 mx-auto lg:mx-0">
                    <Shield size={16} className="text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-0.5">
                    100<span className="text-sm md:text-base text-blue-400">%</span>
                  </div>
                  <div className="text-xs text-gray-400">Vetted Candidates</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual - Smaller */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Main Illustration Container */}
            <div className="relative max-w-md mx-auto">
              {/* Glow Effect Behind */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-2xl" />
              
              {/* SVG Illustration - Smaller */}
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4 shadow-xl">
                <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                  <defs>
                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981"/>
                      <stop offset="100%" stopColor="#14b8a6"/>
                    </linearGradient>
                    <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6"/>
                      <stop offset="100%" stopColor="#3b82f6"/>
                    </linearGradient>
                    <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f97316"/>
                      <stop offset="100%" stopColor="#eab308"/>
                    </linearGradient>
                    <pattern id="gridPattern" patternUnits="userSpaceOnUse" width="20" height="20">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.3"/>
                    </pattern>
                  </defs>

                  {/* Background Grid */}
                  <rect width="500" height="400" fill="url(#gridPattern)"/>
                  
                  {/* Main Blueprint Area */}
                  <g transform="translate(30, 40)">
                    {/* Blueprint Border */}
                    <rect x="0" y="0" width="440" height="320" fill="#0f172a" stroke="#10b981" strokeWidth="2" rx="6" opacity="0.9"/>
                    
                    {/* Title Block */}
                    <rect x="300" y="265" width="130" height="45" fill="#1e293b" stroke="#10b981" strokeWidth="1" rx="4"/>
                    <text x="365" y="287" textAnchor="middle" fill="#10b981" fontSize="10" fontFamily="monospace" fontWeight="600">
                      TALENTCONNECTORS
                    </text>
                    <text x="365" y="300" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">
                      ENGINEERING SPEC v1.0
                    </text>

                    {/* Central Talent Engine */}
                    <g>
                      <rect x="170" y="110" width="90" height="70" fill="#1e293b" stroke="#10b981" strokeWidth="2" rx="5"/>
                      <circle cx="215" cy="145" r="20" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
                      <rect x="205" y="135" width="20" height="20" fill="#10b981" opacity="0.8" rx="3">
                        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
                      </rect>
                      <text x="215" y="200" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600">
                        TALENT ENGINE
                      </text>
                    </g>

                    {/* Database Node */}
                    <g transform="translate(70, 80)">
                      <ellipse cx="0" cy="0" rx="35" ry="18" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2"/>
                      <ellipse cx="0" cy="-10" rx="28" ry="14" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2"/>
                      <ellipse cx="0" cy="-20" rx="20" ry="10" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2"/>
                      <path d="M-10 6 L-10 -16" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4,4">
                        <animate attributeName="stroke-dashoffset" values="0;8" dur="1s" repeatCount="indefinite"/>
                      </path>
                      <path d="M10 6 L10 -16" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4,4">
                        <animate attributeName="stroke-dashoffset" values="8;0" dur="1s" repeatCount="indefinite"/>
                      </path>
                      <text x="0" y="40" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600">
                        TALENT DB
                      </text>
                    </g>

                    {/* AI Matching Node */}
                    <g transform="translate(360, 80)">
                      <polygon points="-32,0 0,-32 32,0 0,32" fill="#1e293b" stroke="#10b981" strokeWidth="2"/>
                      <circle cx="-12" cy="0" r="6" fill="#10b981" opacity="0.8">
                        <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="12" cy="0" r="6" fill="#10b981" opacity="0.8">
                        <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                      </circle>
                      <circle cx="0" cy="12" r="6" fill="#10b981" opacity="0.8">
                        <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" begin="1s"/>
                      </circle>
                      <text x="0" y="55" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600">
                        AI MATCHING
                      </text>
                    </g>

                    {/* Connection Lines */}
                    <g>
                      <path d="M170 145 Q120 145 105 110" stroke="url(#blueGradient)" strokeWidth="2" fill="none" opacity="0.8">
                        <animate attributeName="stroke-dasharray" values="0,150;80,150" dur="2s" fill="freeze"/>
                      </path>
                      <path d="M260 145 Q310 145 325 110" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.8">
                        <animate attributeName="stroke-dasharray" values="0,150;80,150" dur="2s" begin="0.3s" fill="freeze"/>
                      </path>
                      <path d="M105 145 Q70 190 55 235" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.8">
                        <animate attributeName="stroke-dasharray" values="0,150;80,150" dur="2s" begin="0.6s" fill="freeze"/>
                      </path>
                      <path d="M325 145 Q360 190 375 235" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.8">
                        <animate attributeName="stroke-dasharray" values="0,150;80,150" dur="2s" begin="0.9s" fill="freeze"/>
                      </path>
                      
                      {/* Data particles */}
                      <circle r="3" fill="#10b981">
                        <animateMotion dur="3s" repeatCount="indefinite" path="M170 145 Q120 145 105 110"/>
                      </circle>
                      <circle r="3" fill="#10b981">
                        <animateMotion dur="3s" repeatCount="indefinite" begin="1.5s" path="M260 145 Q310 145 325 110"/>
                      </circle>
                    </g>

                    {/* Output Panels */}
                    <g>
                      {/* Engineer */}
                      <g transform="translate(55, 245)">
                        <rect x="-25" y="-14" width="50" height="28" fill="#1e293b" stroke="#f97316" strokeWidth="2" rx="5"/>
                        <circle cx="-10" cy="0" r="6" fill="#f97316"/>
                        <circle cx="10" cy="0" r="6" fill="#f97316"/>
                        <text x="0" y="-22" textAnchor="middle" fill="#f97316" fontSize="9" fontWeight="600">
                          ENGINEER
                        </text>
                      </g>

                      {/* Developer */}
                      <g transform="translate(375, 245)">
                        <rect x="-25" y="-14" width="50" height="28" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" rx="5"/>
                        <circle cx="-10" cy="0" r="6" fill="#06b6d4"/>
                        <circle cx="10" cy="0" r="6" fill="#06b6d4"/>
                        <text x="0" y="-22" textAnchor="middle" fill="#06b6d4" fontSize="9" fontWeight="600">
                          DEVELOPER
                        </text>
                      </g>
                    </g>

                    {/* Decorative Elements */}
                    <text x="15" y="25" fill="#64748b" fontSize="9" fontFamily="monospace">
                      1101 0010 1010 0111
                    </text>
                    
                    {/* Gear */}
                    <g transform="translate(85, 270)" opacity="0.5">
                      <circle cx="0" cy="0" r="10" fill="none" stroke="#64748b" strokeWidth="2"/>
                      <circle cx="0" cy="0" r="3" fill="#64748b"/>
                    </g>
                  </g>
                </svg>
              </div>

              {/* Floating Cards - Smaller */}
              <motion.div
                className="absolute -left-4 top-1/4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                    <Cpu size={18} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xs">Smart Matching</h4>
                    <p className="text-gray-400 text-[10px]">AI-powered precision</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-4 top-1/3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <GitBranch size={18} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xs">Integrated Pipeline</h4>
                    <p className="text-gray-400 text-[10px]">End-to-end tracking</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-2 left-1/4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Server size={18} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xs">Enterprise Grade</h4>
                    <p className="text-gray-400 text-[10px]">Scalable solutions</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade - Smaller */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent z-10" />
    </section>
  );
};

export default Hero;