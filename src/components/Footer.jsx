import { GitFork, ExternalLink, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { personal, socials } from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-ink py-12"
      role="contentinfo"
    >
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Identity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ rotate: 8, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-9 h-9 bg-cobalt-600 text-white font-display font-bold text-sm rounded-xl flex items-center justify-center"
            >
              TM
            </motion.div>
            <div>
              <p className="font-display font-semibold text-white text-sm">{personal.name}</p>
              <p className="text-ink-faint text-xs font-mono">Data Analyst · AI & Data Science</p>
            </div>
          </motion.div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Footer navigation">
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.06 }}
                whileHover={{ y: -2, color: '#fff' }}
                className="text-xs text-ink-faint font-medium transition-colors duration-150"
              >
                {link}
              </motion.a>
            ))}
          </nav>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            {[
              { href: socials.github, icon: GitFork, label: 'GitHub' },
              { href: socials.linkedin, icon: ExternalLink, label: 'LinkedIn' },
              { href: socials.email, icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                whileHover={{ scale: 1.15, y: -2, backgroundColor: 'rgba(37,99,235,0.3)', borderColor: '#60A5FA' }}
                whileTap={{ scale: 0.92 }}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-ink-light/30 text-ink-faint hover:text-white transition-colors duration-200"
              >
                <Icon size={14} strokeWidth={1.75} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 pt-6 border-t border-ink-light/20 flex flex-col sm:flex-row items-center justify-between gap-2"
        >
          <p className="text-xs text-ink-faint font-mono">
            © {year} {personal.name} · All rights reserved.
          </p>

        </motion.div>
      </div>
    </motion.footer>
  );
}
