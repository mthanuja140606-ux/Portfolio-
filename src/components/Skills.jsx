import { useState, useRef } from 'react';
import { Code, Globe, Package, Database, BarChart2, Layers, Users } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { skills } from '../data/portfolio';
import { AnimatedSection } from './ui/AnimatedSection';
import { SectionHeading } from './ui/SectionHeading';

const iconMap = {
  'code': Code,
  'globe': Globe,
  'package': Package,
  'database': Database,
  'bar-chart': BarChart2,
  'layers': Layers,
  'users': Users,
};

const categoryColors = {
  'Programming Languages': 'cobalt',
  'Web Technologies': 'data',
  'Python Packages': 'cobalt',
  'Databases': 'data',
  'Data Visualization': 'cobalt',
  'Core Competencies': 'data',
  'Soft Skills': 'neutral',
};

// 3D tilt card component
function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`relative ${className}`}
    >
      {/* Glare overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: useTransform(glareX, (v) =>
            `radial-gradient(circle at ${v} 30%, rgba(255,255,255,0.12) 0%, transparent 60%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
}

const pillVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 8 },
  visible: (i) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.35, type: 'spring', stiffness: 300 },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <section id="skills" className="py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <SectionHeading
            label="Technical Skills"
            title="Tools & Technologies"
            subtitle="A curated overview of my technical expertise across programming, data analysis, and visualization."
            align="center"
            className="mx-auto"
          />
        </motion.div>

        {/* Skill clusters grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skills.map((group, gi) => {
            const Icon = iconMap[group.icon] || Code;
            const color = categoryColors[group.category] || 'cobalt';
            const isHovered = hoveredCategory === group.category;

            return (
              <TiltCard key={group.category}>
                <motion.div
                  custom={gi}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={cardVariants}
                  onMouseEnter={() => setHoveredCategory(group.category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className={`card-base bg-white/70 backdrop-blur-xl border-white/60 p-5 h-full transition-shadow duration-300 ${isHovered ? 'shadow-elevated' : ''}`}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      animate={isHovered ? { scale: 1.15, rotate: 6 } : { scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        color === 'cobalt' ? 'bg-cobalt-50 border border-cobalt-100' :
                        color === 'data' ? 'bg-amber-50 border border-amber-100' :
                        'bg-canvas-200 border border-border'
                      }`}
                    >
                      <Icon size={15} strokeWidth={2} className={
                        color === 'cobalt' ? 'text-cobalt-600' :
                        color === 'data' ? 'text-amber-600' : 'text-ink-muted'
                      } />
                    </motion.div>
                    <h3 className="text-xs font-semibold text-ink-light uppercase tracking-wide">
                      {group.category}
                    </h3>
                  </div>

                  {/* Skill pills — staggered pop-in */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-2"
                  >
                    {group.items.map((skill, si) => (
                      <motion.span
                        key={skill}
                        custom={gi * 3 + si}
                        variants={pillVariants}
                        whileHover={{
                          scale: 1.08,
                          transition: { type: 'spring', stiffness: 400 },
                        }}
                        className={`text-xs font-medium px-2.5 py-1 rounded-lg border cursor-default transition-colors duration-150 ${
                          color === 'cobalt'
                            ? 'bg-cobalt-50 text-cobalt-700 border-cobalt-100 hover:bg-cobalt-100'
                            : color === 'data'
                            ? 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100'
                            : 'bg-canvas-200 text-ink-light border-border hover:bg-canvas-300'
                        }`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-ink-faint font-mono mt-8"
        >
          * Basic exposure to Java from academic coursework
        </motion.p>
      </div>
    </section>
  );
}
