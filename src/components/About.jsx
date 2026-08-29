import { MapPin, GraduationCap, Building2, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { about, personal } from '../data/portfolio';
import { AnimatedSection } from './ui/AnimatedSection';
import { SectionHeading } from './ui/SectionHeading';
import { useCountUp } from '../hooks/useCountUp';

// Animated stat counter card
function StatCard({ value, label, isFloat = false, delay = 0 }) {
  const numericValue = parseFloat(value.replace('+', ''));
  const { value: count, ref } = useCountUp(numericValue, 1.2, isFloat ? 2 : 0, delay);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="bg-canvas-200 rounded-xl p-3 text-center border border-border cursor-default"
    >
      <p className="font-display font-bold text-xl text-cobalt-600">
        {isFloat ? count.toFixed(2) : Math.floor(count)}{value.includes('+') ? '+' : ''}
      </p>
      <p className="text-2xs font-mono text-ink-muted uppercase tracking-wide mt-0.5">{label}</p>
    </motion.div>
  );
}

export default function About() {
  const snapshotItems = [
    { icon: GraduationCap, label: 'Degree', value: about.snapshot.degree },
    { icon: Building2, label: 'College', value: about.snapshot.college },
    { icon: Star, label: 'CGPA', value: `${about.snapshot.cgpa} / 10` },
    { icon: MapPin, label: 'Location', value: about.snapshot.location },
  ];

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <SectionHeading
                label="About Me"
                title="An analytical mind, curious by nature."
                className="mb-8"
              />
            </motion.div>

            <div className="space-y-4">
              {about.summary.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="text-ink-light leading-relaxed text-[15px]"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Animated quote block */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 relative"
            >
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-0 bottom-0 w-1 bg-cobalt-200 rounded-full origin-top"
              />
              <div className="pl-5">
                <p className="text-ink-muted text-sm italic leading-relaxed">
                  "Data is the compass. Analysis is the journey. Insight is the destination."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Profile Snapshot */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2 }}
              className="bg-canvas rounded-3xl border border-border p-6 relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-2xs font-mono text-ink-muted uppercase tracking-widest mb-1">Profile Snapshot</p>
                  <h3 className="font-display font-semibold text-ink text-lg">{personal.name}</h3>
                </div>
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-10 h-10 bg-cobalt-600 text-white font-display font-bold text-sm rounded-xl flex items-center justify-center shadow-cobalt"
                >
                  TM
                </motion.div>
              </div>

              {/* Snapshot items */}
              <div className="space-y-4">
                {snapshotItems.map(({ icon: Icon, label, value }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.45 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 shrink-0 rounded-lg bg-cobalt-50 border border-cobalt-100 flex items-center justify-center mt-0.5">
                      <Icon size={14} className="text-cobalt-600" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-2xs font-mono text-ink-muted uppercase tracking-widest">{label}</p>
                      <p className="text-sm font-medium text-ink mt-0.5">{value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-6 pt-5 border-t border-border flex items-center gap-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2 h-2 rounded-full bg-green-500"
                />
                <span className="text-xs font-medium text-ink-muted">Open to internships & opportunities</span>
              </motion.div>

              <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 dot-bg pointer-events-none" aria-hidden="true" />
            </motion.div>

            {/* Mini stats row with countUp */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <StatCard value="3+" label="Internships" delay={0.1} />
              <StatCard value="2" label="Projects" delay={0.2} />
              <StatCard value="4" label="Certifications" delay={0.3} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
