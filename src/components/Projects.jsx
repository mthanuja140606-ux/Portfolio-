import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sun, ShoppingBag } from 'lucide-react';
import { projects } from '../data/portfolio';
import { AnimatedSection } from './ui/AnimatedSection';
import { SectionHeading } from './ui/SectionHeading';
import { Badge } from './ui/Badge';

// Solar monitoring visual — with animated sun rays
function SolarVisual() {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
      {/* Animated sun rays */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 bg-amber-300/50 origin-bottom rounded-full"
          style={{
            height: 28,
            bottom: '50%',
            left: '50%',
            rotate: i * 45,
            transformOrigin: 'bottom center',
          }}
          animate={{ scaleY: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}

      {/* Rotating sun */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
        className="absolute z-10"
        style={{ top: '28%', left: '50%', marginLeft: -24, marginTop: -24 }}
      >
        <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center shadow-lg">
          <Sun size={20} className="text-white" />
        </div>
      </motion.div>

      {/* Solar panels */}
      <div className="absolute bottom-4 flex gap-1.5 z-10">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
            whileHover={{ scaleY: 1.1, backgroundColor: '#93C5FD' }}
            className="w-8 h-10 bg-cobalt-200 border border-cobalt-300 rounded-sm origin-bottom cursor-default"
            style={{ transform: 'skewX(-10deg)' }}
          />
        ))}
      </div>

      {/* Data points */}
      {[
        { top: '12%', left: '8%', label: '92%', sub: 'Efficiency' },
        { top: '12%', right: '8%', label: '480W', sub: 'Output' },
      ].map(({ label, sub, ...pos }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          className="absolute bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 border border-amber-100 shadow-sm"
          style={pos}
        >
          <p className="text-xs font-bold text-amber-700">{label}</p>
          <p className="text-2xs text-amber-500">{sub}</p>
        </motion.div>
      ))}
    </div>
  );
}

// Smart retail visual — animated occupancy bars
function RetailVisual() {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-cobalt-50 to-blue-50 border border-cobalt-100">
      <div className="grid grid-cols-3 gap-2 w-full px-4">
        {[
          { pct: 85, label: 'Zone A' },
          { pct: 60, label: 'Zone B' },
          { pct: 40, label: 'Zone C' },
        ].map(({ pct, label }, i) => (
          <div key={label} className="flex flex-col gap-1.5 items-center">
            <div className="relative w-full h-14 bg-white rounded-lg border border-cobalt-100 overflow-hidden flex items-end">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                className="w-full rounded-md"
                style={{ background: `hsl(${220 + pct * 0.3}, 70%, ${60 - pct * 0.12}%)` }}
              />
            </div>
            <p className="text-2xs font-mono text-cobalt-600">{label}</p>
            <p className="text-2xs font-bold text-cobalt-700">{pct}%</p>
          </div>
        ))}
      </div>

      {/* Live indicator */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 rounded-lg px-2 py-1 border border-cobalt-100">
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-1.5 h-1.5 rounded-full bg-green-500"
        />
        <p className="text-2xs font-mono text-cobalt-600">Live • Occupancy</p>
      </div>

      <div className="absolute top-3 right-3 w-7 h-7 bg-cobalt-100 rounded-lg flex items-center justify-center border border-cobalt-200">
        <ShoppingBag size={12} className="text-cobalt-600" />
      </div>
    </div>
  );
}

const visuals = {
  'solar-tracking': SolarVisual,
  'smart-retail': RetailVisual,
};

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  const Visual = visuals[project.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="card-base overflow-hidden group cursor-default transition-shadow duration-300 hover:shadow-elevated"
    >
      {/* Visual */}
      <div className="p-4 pb-0">
        {Visual && <Visual />}
      </div>

      {/* Content */}
      <div className="p-5">
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + index * 0.1 }}
        >
          <Badge variant={project.color === 'amber' ? 'amber' : 'cobalt'} size="xs" className="mb-3">
            {project.category}
          </Badge>
        </motion.div>

        <h3 className="font-display font-bold text-lg text-ink mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-sm text-ink-muted leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tags — animated */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag, ti) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + ti * 0.06, type: 'spring', stiffness: 300 }}
              className="text-2xs font-medium px-2 py-0.5 rounded-md bg-canvas-200 text-ink-light border border-border"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Expand button */}
        <motion.button
          type="button"
          id={`project-details-${project.id}`}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 text-sm font-medium text-cobalt-600 hover:text-cobalt-700 transition-colors duration-200"
        >
          {expanded ? 'Hide Details' : 'View Details'}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, type: 'spring' }}
          >
            <ChevronDown size={15} />
          </motion.div>
        </motion.button>

        {/* Expanded details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-border">
                <div className="space-y-3">
                  <div>
                    <p className="text-2xs font-mono text-ink-muted uppercase tracking-widest mb-1.5">Problem</p>
                    <p className="text-sm text-ink-light leading-relaxed">{project.problem}</p>
                  </div>
                  <div>
                    <p className="text-2xs font-mono text-ink-muted uppercase tracking-widest mb-1.5">Key Work</p>
                    <ul className="space-y-1.5">
                      {project.keyWork.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className="flex items-start gap-2 text-sm text-ink-light"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cobalt-400 mt-1.5 shrink-0"></span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-2xs font-mono text-ink-muted uppercase tracking-widest mb-1.5">Additional Notes</p>
                    <p className="text-sm text-ink-light leading-relaxed">{project.details}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-white overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <SectionHeading
            label="Projects"
            title="Work That Tells a Story"
            subtitle="Projects built around real-world problems, data collection, analysis, and decision-making."
            align="center"
            className="mx-auto"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
