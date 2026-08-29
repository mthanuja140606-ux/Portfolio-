import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Calendar, CheckCircle } from 'lucide-react';
import { certifications } from '../data/portfolio';
import { SectionHeading } from './ui/SectionHeading';

// Shimmer overlay for the card
function ShimmerCard({ cert, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="card-base p-5 flex items-start gap-4 relative overflow-hidden group cursor-default transition-shadow duration-300 hover:shadow-elevated"
    >
      {/* Shimmer sweep on hover */}
      <motion.div
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none z-20"
      />

      {/* Award icon with spin-in */}
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={inView ? { scale: 1, rotate: 0 } : {}}
        transition={{ delay: index * 0.12 + 0.2, type: 'spring', stiffness: 280 }}
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          cert.color === 'cobalt'
            ? 'bg-cobalt-50 border border-cobalt-100'
            : 'bg-amber-50 border border-amber-100'
        }`}
      >
        <Award
          size={18}
          strokeWidth={1.75}
          className={cert.color === 'cobalt' ? 'text-cobalt-600' : 'text-amber-600'}
        />
      </motion.div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.3 }}
          className="font-display font-semibold text-ink text-sm leading-snug"
        >
          {cert.name}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.35 }}
          className="text-ink-muted text-xs mt-0.5"
        >
          {cert.issuer}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, x: -6 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.12 + 0.4 }}
          className="flex items-center gap-1.5 mt-2 text-xs text-ink-faint"
        >
          <Calendar size={11} strokeWidth={2} />
          <span className="font-mono">{cert.date}</span>
        </motion.div>
      </div>

      {/* Checkmark — delayed pop */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: index * 0.12 + 0.5, type: 'spring', stiffness: 300 }}
      >
        <CheckCircle
          size={16}
          className={cert.color === 'cobalt' ? 'text-cobalt-300' : 'text-amber-300'}
          strokeWidth={2}
        />
      </motion.div>

      {/* Color accent line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ delay: index * 0.12 + 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-r-full origin-top ${
          cert.color === 'cobalt' ? 'bg-cobalt-400' : 'bg-amber-400'
        }`}
        aria-hidden="true"
      />
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 bg-canvas overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <SectionHeading
            label="Certifications"
            title="Credentials & Recognition"
            subtitle="Professional certifications validating skills in networking, AI, and data analytics."
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, i) => (
            <ShimmerCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
