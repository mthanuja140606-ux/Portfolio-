import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { experience } from '../data/portfolio';
import { SectionHeading } from './ui/SectionHeading';

function TimelineDot({ index, inView }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ delay: index * 0.2 + 0.1, duration: 0.45, type: 'spring', stiffness: 250 }}
      className="relative"
    >
      {/* Outer ring pulse */}
      <motion.div
        animate={inView ? { scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] } : {}}
        transition={{ delay: index * 0.2 + 0.5, duration: 2, repeat: 2, ease: 'easeOut' }}
        className="absolute inset-0 rounded-full bg-cobalt-400"
      />
      <div className="w-4 h-4 rounded-full bg-neon-cyan border-4 border-midnight shadow-[0_0_15px_rgba(34,211,238,0.5)] relative z-10" />
    </motion.div>
  );
}

function ExperienceCard({ item, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="relative flex gap-6">
      {/* Timeline column */}
      <div className="flex flex-col items-center">
        <div className="mt-1 z-10">
          <TimelineDot index={index} inView={inView} />
        </div>
        {!isLast && (
          <div className="relative w-px flex-1 bg-slate-800 mt-2 overflow-hidden">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-cobalt-200 origin-top"
            />
          </div>
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 28 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.2 + 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}
        className="flex-1 pb-8 card-base bg-slate-900 border-slate-800 p-5 transition-shadow duration-300"
      >
        {/* Company + date row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.3 }}
              className="font-display font-bold text-white text-base leading-snug"
            >
              {item.company}
            </motion.h3>
            <p className="text-neon-cyan font-medium text-sm mt-0.5">{item.role}</p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2 + 0.35 }}
            className="flex flex-col items-end gap-1"
          >
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Calendar size={12} strokeWidth={2} />
              <span className="font-mono">{item.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <MapPin size={12} strokeWidth={2} />
              <span>{item.type}</span>
            </div>
          </motion.div>
        </div>

        {/* Responsibilities — stagger */}
        <ul className="space-y-2">
          {item.responsibilities.map((resp, ri) => (
            <motion.li
              key={ri}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 + 0.4 + ri * 0.08 }}
              className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.2 + 0.45 + ri * 0.08, type: 'spring' }}
                className="w-1.5 h-1.5 rounded-full bg-cobalt-300 mt-2 shrink-0"
              />
              {resp}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const sorted = [...experience].sort((a, b) => b.order - a.order);

  return (
    <section id="experience" className="py-24 bg-midnight text-white overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <SectionHeading
            label="Experience"
            title="Professional Journey"
            subtitle="Internships and virtual programs that shaped my data analytics and development skills."
            dark
          />
        </motion.div>

        <div className="max-w-3xl">
          {sorted.map((item, i) => (
            <ExperienceCard
              key={item.id}
              item={item}
              index={i}
              isLast={i === sorted.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
