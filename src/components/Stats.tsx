import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Shield, Target, HeartHandshake } from 'lucide-react';

const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const features = [
    {
      icon: <Zap size={28} />,
      value: '48h',
      title: 'Response Time',
      description: 'Lightning fast guaranteed',
    },
    {
      icon: <Shield size={28} />,
      value: '100%',
      title: 'Confidential',
      description: 'Your privacy matters',
    },
    {
      icon: <Target size={28} />,
      value: '1:1',
      title: 'Personal Match',
      description: 'Dedicated recruiter',
    },
    {
      icon: <HeartHandshake size={28} />,
      value: '$0',
      title: 'For Candidates',
      description: 'Always free service',
    },
  ];

  return (
    <section className="stats" ref={ref}>
      <div className="stats-bg-pattern"></div>
      <div className="container">
        <div className="stats-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="stat-icon">{feature.icon}</div>
              <div className="stat-number">{feature.value}</div>
              <div className="stat-label">{feature.title}</div>
              <div className="stat-description">{feature.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;