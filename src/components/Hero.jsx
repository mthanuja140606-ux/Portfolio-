import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Download } from 'lucide-react';
import { personal, socials } from '../data/portfolio';
import { SocialIcons } from './ui/SocialIcons';

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
                  download={download ? 'Thanuja_M_Resume.pdf' : undefined}
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

          {/* RIGHT: Profile Picture */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.7, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.02, rotate: 1 }}
                className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-elevated border-[6px] border-white bg-white z-10"
              >
                <img 
                  src="/images/profile.jpg" 
                  alt={personal.name} 
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>
              
              {/* Decorative background blobs */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute top-4 -right-4 lg:-right-6 w-full h-full bg-cobalt-100 rounded-[2rem] -z-10 rotate-3"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="absolute -bottom-4 -left-4 lg:-left-6 w-full h-full bg-amber-100 rounded-[2rem] -z-20 -rotate-3"
              />
            </div>
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
