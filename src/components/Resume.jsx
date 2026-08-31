import { Download, Eye, Sparkles } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { personal } from '../data/portfolio';
import { forceDownload } from '../utils/downloadFile';

// Floating glow button
function GlowButton({ href, download: dl, id, icon, label, primary }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-20, 20], [4, -4]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-4, 4]), { stiffness: 200, damping: 20 });

  const handleClick = (e) => {
    if (dl) {
      e.preventDefault();
      forceDownload(href, 'Thanuja_M_Resume.pdf');
    }
  };

  return (
    <motion.a
      href={href}
      id={id}
      download={dl ? 'Thanuja_M_Resume.pdf' : undefined}
      target="_blank"
      rel={!dl ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.96 }}
      className={`${primary ? 'btn-primary text-base px-8 py-3.5' : 'btn-secondary text-base px-8 py-3.5'} relative overflow-hidden`}
    >
      {/* Hover glow */}
      {primary && (
        <motion.div
          className="absolute inset-0 bg-white/10 opacity-0 rounded-xl"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      {icon}
      {label}
    </motion.a>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="py-24 bg-white overflow-hidden">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="section-label block mb-4"
          >
            Resume
          </motion.span>

          {/* Heading — word stagger */}
          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl lg:text-5xl font-bold text-ink tracking-tight leading-tight"
            >
              Let&apos;s make<br />
              <span className="text-cobalt-600 relative inline-block">
                data useful.
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cobalt-200 origin-left"
                />
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.55 }}
            className="section-subtitle max-w-lg mx-auto mb-10"
          >
            My resume covers my academic background, internship experience, technical skills, and certifications — all in one place.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-14"
          >
            <GlowButton
              href={personal.resumePath}
              dl
              id="resume-download-btn"
              icon={<Download size={16} strokeWidth={2} />}
              label="Download Resume"
              primary
            />
            <GlowButton
              href={personal.resumePath}
              id="resume-view-btn"
              icon={<Eye size={16} strokeWidth={2} />}
              label="View Resume"
              primary={false}
            />
          </motion.div>

          {/* Animated resume preview card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            animate={{ y: [0, -6, 0] }}
            // NOTE: whileInView + animate together need care
            className="max-w-xs mx-auto"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              whileHover={{ scale: 1.03, boxShadow: '0 16px 40px rgba(37,99,235,0.14)' }}
              className="bg-canvas rounded-2xl border border-border p-5 text-left shadow-card"
            >
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                <div className="w-8 h-8 bg-cobalt-600 text-white font-display font-bold text-sm rounded-lg flex items-center justify-center">
                  TM
                </div>
                <div>
                  <p className="font-display font-semibold text-ink text-sm">{personal.name}</p>
                  <p className="text-2xs text-ink-muted">Data Analyst · AI & Data Science</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 2 }}
                  className="ml-auto"
                >
                  <Sparkles size={14} className="text-cobalt-400" />
                </motion.div>
              </div>

              {['Skills', 'Projects', 'Internships', 'Certifications'].map((section, i) => (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 py-1.5"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-cobalt-400 shrink-0" />
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                    className="flex-1 h-1.5 bg-canvas-300 rounded-full overflow-hidden"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${70 + i * 8}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + i * 0.12, duration: 0.6 }}
                      className="h-full bg-cobalt-200 rounded-full"
                    />
                  </motion.div>
                  <span className="text-2xs text-ink-faint font-mono w-20 shrink-0">{section}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-xs text-ink-faint font-mono mt-6"
          >
            PDF available · /resume/Thanuja_M_Resume.pdf
          </motion.p>
        </div>
      </div>
    </section>
  );
}
