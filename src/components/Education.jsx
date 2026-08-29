import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { education } from '../data/portfolio';
import { SectionHeading } from './ui/SectionHeading';
import { useCountUp } from '../hooks/useCountUp';

function AnimatedScore({ item }) {
  const numericScore = parseFloat(item.score);
  const isCgpa = item.scoreType === 'cgpa';
  const { value: count, ref } = useCountUp(numericScore, 1.4, isCgpa ? 2 : 0, 0.5);

  return (
    <div ref={ref}>
      <div className={`px-2.5 py-0.5 rounded-lg text-xs font-bold inline-block ${
        isCgpa ? 'bg-cobalt-50 text-cobalt-700 border border-cobalt-100'
               : 'bg-amber-50 text-amber-700 border border-amber-100'
      }`}>
        {isCgpa ? `${count.toFixed(2)} CGPA` : `${Math.floor(count)}%`}
      </div>
    </div>
  );
}

function EducationCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(37,99,235,0.1)' }}
      className="card-base p-6 relative overflow-hidden transition-shadow duration-300"
    >
      {/* Current badge */}
      {item.current && (
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="absolute top-4 right-4 flex items-center gap-1.5"
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-1.5 rounded-full bg-green-500"
          />
          <span className="text-2xs font-medium text-green-600 font-mono uppercase tracking-wide">Current</span>
        </motion.div>
      )}

      <div className="flex items-start gap-4">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: index * 0.2 + 0.2, type: 'spring', stiffness: 250 }}
          className="w-10 h-10 rounded-xl bg-cobalt-50 border border-cobalt-100 flex items-center justify-center shrink-0"
        >
          <GraduationCap size={18} className="text-cobalt-600" strokeWidth={1.75} />
        </motion.div>

        <div className="flex-1 min-w-0">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.3 }}
            className="font-display font-bold text-ink text-base leading-snug"
          >
            {item.institution}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.35 }}
            className="text-cobalt-600 text-sm font-medium mt-1"
          >
            {item.degree}
          </motion.p>

          <div className="flex flex-wrap items-center gap-4 mt-3">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 + 0.4 }}
              className="flex items-center gap-1.5 text-xs text-ink-muted"
            >
              <Calendar size={12} strokeWidth={2} />
              <span className="font-mono">{item.period}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.45, type: 'spring' }}
            >
              <AnimatedScore item={item} />
            </motion.div>
          </div>

          {/* CGPA progress bar */}
          {item.scoreType === 'cgpa' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.5 }}
              className="mt-3"
            >
              <div className="h-1.5 bg-canvas-300 rounded-full overflow-hidden w-full max-w-48">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${(parseFloat(item.score) / 10) * 100}%` } : {}}
                  transition={{ delay: index * 0.2 + 0.65, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-cobalt-400 to-cobalt-600"
                />
              </div>
              <p className="text-2xs font-mono text-ink-faint mt-1">{item.score} / 10.0</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Subtle corner decoration */}
      <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10 dot-bg pointer-events-none" aria-hidden="true" />
    </motion.div>
  );
}

export default function Education() {
  return (
    <section id="education" className="py-24 bg-white overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <SectionHeading
            label="Education"
            title="Academic Background"
            subtitle="Building a strong analytical and technical foundation through focused academic study."
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
          {education.map((edu, i) => (
            <EducationCard key={edu.id} item={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
