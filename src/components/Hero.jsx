import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Download } from 'lucide-react';
import { personal, socials } from '../data/portfolio';
import { SocialIcons } from './ui/SocialIcons';
import { useCountUp } from '../hooks/useCountUp';

// Word-by-word animated headline
function AnimatedHeadline({ lines }) {
  const wordVariants = {
    hidden: { opacity: 0, y: 40, skewY: 4 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: { delay: 0.25 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <div className="mb-6 overflow-hidden">
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.h1
            custom={i}
            initial="hidden"
            animate="visible"
            variants={wordVariants}
            className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight"
          >
            {i === 1 ? (
              <span className="relative inline-block">
                <span className="text-cobalt-600">{line}</span>
                {/* Underline draw */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cobalt-300 origin-left"
                />
              </span>
            ) : (
              <span className="text-ink">{line}</span>
            )}
          </motion.h1>
        </div>
      ))}
    </div>
  );
}

// Animated KPI with countUp
function KpiCard({ label, value, color, trend, numericValue, decimals = 0, delay = 0 }) {
  const { value: count, ref } = useCountUp(numericValue, 1.2, decimals, delay);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.65 + delay, duration: 0.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.04, y: -2 }}
      className={`rounded-xl p-2.5 cursor-default ${
        color === 'cobalt' ? 'bg-cobalt-50 border border-cobalt-100' :
        color === 'data' ? 'bg-amber-50 border border-amber-100' :
        'bg-green-50 border border-green-100'
      }`}
    >
      <p className={`text-2xs font-mono tracking-widest uppercase mb-1 ${
        color === 'cobalt' ? 'text-cobalt-500' :
        color === 'data' ? 'text-amber-600' : 'text-green-600'
      }`}>{label}</p>
      <div className="flex items-end justify-between">
        <span className={`text-lg font-display font-bold ${
          color === 'cobalt' ? 'text-cobalt-700' :
          color === 'data' ? 'text-amber-700' : 'text-green-700'
        }`}>
          {decimals > 0 ? count.toFixed(decimals) : count}
        </span>
        <span className={`text-xs font-bold ${
          color === 'cobalt' ? 'text-cobalt-500' :
          color === 'data' ? 'text-amber-500' : 'text-green-500'
        }`}>{trend}</span>
      </div>
    </motion.div>
  );
}

// Animated bar row with spring
function SkillBar({ label, pct, color, index }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-xs text-ink-muted w-14 shrink-0 font-medium">{label}</span>
      <div className="flex-1 h-1.5 bg-canvas-300 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay: 0.9 + index * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full ${color === 'cobalt' ? 'bg-cobalt-500' : 'bg-amber-500'}`}
        />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 + index * 0.1 }}
        className="text-2xs font-mono text-ink-faint w-8 text-right"
      >
        {pct}%
      </motion.span>
    </div>
  );
}

// Floating badge with parallax
function FloatingBadge({ children, className, delay = 0, floatDelay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200 }}
      className={className}
      style={{
        animation: `float 5s ease-in-out ${floatDelay}s infinite`,
      }}
    >
      {children}
    </motion.div>
  );
}

function DataDashboardVisual() {
  const skills = [
    { label: 'Python', pct: 82, color: 'cobalt' },
    { label: 'SQL', pct: 78, color: 'cobalt' },
    { label: 'Power BI', pct: 70, color: 'data' },
    { label: 'Excel', pct: 75, color: 'data' },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0">
      {/* Main dashboard card */}
      <motion.div
        initial={{ opacity: 0, y: 48, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1000 }}
        whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(37,99,235,0.12)' }}
        className="relative bg-white rounded-3xl shadow-elevated border border-border p-5 overflow-hidden transition-shadow duration-300"
      >
        {/* Dashboard header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xs font-mono text-ink-muted uppercase tracking-widest">Analytics Dashboard</p>
            <p className="text-sm font-display font-semibold text-ink mt-0.5">Data Overview</p>
          </div>
          <div className="flex gap-1.5">
            {['bg-red-400', 'bg-amber-400', 'bg-green-400'].map((c) => (
              <motion.div
                key={c}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
                className={`w-2.5 h-2.5 rounded-full ${c}`}
              />
            ))}
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          <KpiCard label="CGPA" value="8.47" numericValue={8.47} decimals={2} color="cobalt" trend="+" delay={0} />
          <KpiCard label="Projects" value="02" numericValue={2} color="data" trend="↑" delay={0.1} />
          <KpiCard label="Certs" value="04" numericValue={4} color="green" trend="✓" delay={0.2} />
        </div>

        {/* Skill bars */}
        <div className="mb-4">
          <p className="text-2xs font-mono text-ink-muted uppercase tracking-widest mb-2.5">Skill Proficiency</p>
          <div className="space-y-2">
            {skills.map((s, i) => <SkillBar key={s.label} {...s} index={i} />)}
          </div>
        </div>

        {/* Tech pills */}
        <div>
          <p className="text-2xs font-mono text-ink-muted uppercase tracking-widest mb-2">Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {['Python', 'SQL', 'Power BI', 'Tableau', 'Excel', 'Pandas'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.07, type: 'spring', stiffness: 300 }}
                className="text-2xs font-medium px-2 py-0.5 rounded-md bg-canvas-200 text-ink-light border border-border"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subtle dot pattern */}
        <div className="absolute bottom-0 right-0 w-20 h-20 opacity-20 dot-bg pointer-events-none" />
      </motion.div>

      {/* Floating badge — top right */}
      <FloatingBadge
        delay={0.85}
        floatDelay={0}
        className="absolute -top-4 -right-4 bg-cobalt-600 text-white rounded-2xl px-3 py-1.5 shadow-cobalt z-10"
      >
        <p className="text-2xs font-mono tracking-wide">Data Analytics</p>
      </FloatingBadge>

      {/* Floating badge — bottom left */}
      <FloatingBadge
        delay={1.0}
        floatDelay={1.2}
        className="absolute -bottom-8 -left-8 md:-left-12 bg-white rounded-xl px-3 py-2 shadow-elevated border border-border z-10"
      >
        <p className="text-2xs font-mono text-ink-muted">AI & Data Science</p>
        <div className="flex gap-1 mt-1">
          {['▰', '▰', '▰', '▰', '▱'].map((b, i) => (
            <span key={i} className={`text-xs ${i < 4 ? 'text-cobalt-500' : 'text-border-dark'}`}>{b}</span>
          ))}
        </div>
      </FloatingBadge>
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
    >
      {/* Parallax background grid */}
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 40]) }}
        className="absolute inset-0 grid-bg opacity-60 pointer-events-none" aria-hidden="true"
      />

      {/* Animated blob decorations */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], x: [0, 12, 0], y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-neon-cyan opacity-20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], x: [0, -8, 0], y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-neon-purple opacity-20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <motion.div style={{ y, opacity }} className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* LEFT: Editorial text content */}
          <div className="order-2 lg:order-1">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '1.5rem' }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="h-px bg-cobalt-600"
              />
              <span className="section-label">{personal.tagline}</span>
            </motion.div>

            {/* Name with shimmer */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.5 }}
              className="font-display text-sm font-semibold text-cobalt-600 tracking-wide mb-2"
            >
              {personal.name}
            </motion.p>

            {/* Word-by-word headline */}
            <AnimatedHeadline lines={personal.headline} />

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="text-ink-muted text-base lg:text-lg leading-relaxed max-w-lg mb-8"
            >
              {personal.bio}
            </motion.p>

            {/* CTAs with stagger */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              {[
                { href: '#projects', label: 'Explore My Work', icon: <ArrowRight size={15} />, primary: true, id: 'hero-explore-work' },
                { href: personal.resumePath, label: 'Download Resume', icon: <Download size={15} />, primary: false, id: 'hero-download-resume', download: true },
              ].map(({ href, label, icon, primary, id, download }) => (
                <motion.a
                  key={id}
                  href={href}
                  id={id}
                  download={download}
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={primary ? 'btn-primary' : 'btn-secondary'}
                >
                  {label}
                  {icon}
                </motion.a>
              ))}
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <SocialIcons />
            </motion.div>
          </div>

          {/* RIGHT: Data Dashboard Visual */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <DataDashboardVisual />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="flex justify-center mt-16 lg:mt-20"
        >
          <a
            href="#about"
            aria-label="Scroll to about section"
            className="flex flex-col items-center gap-2 text-ink-faint hover:text-cobalt-500 transition-colors duration-200"
          >
            <span className="text-2xs font-mono tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            >
              <ArrowDown size={16} strokeWidth={1.5} />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
