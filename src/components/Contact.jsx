import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, GitFork, ExternalLink, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personal, socials } from '../data/portfolio';
import { SectionHeading } from './ui/SectionHeading';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const contactInfo = [
  { icon: Mail,         label: 'Email',    value: personal.email,         href: `mailto:${personal.email}` },
  { icon: Phone,        label: 'Phone',    value: personal.phone,         href: `tel:${personal.phone.replace(/\s/g, '')}` },
  { icon: MapPin,       label: 'Location', value: personal.location,      href: null },
  { icon: GitFork,      label: 'GitHub',   value: 'mthanuja140606-ux',    href: socials.github },
  { icon: ExternalLink, label: 'LinkedIn', value: 'thanuja-m-78034a340',  href: socials.linkedin },
];

function ContactInfoCard({ item, index }) {
  const { icon: Icon, label, value, href } = item;
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 4 }}
      className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800 transition-all duration-200 hover:shadow-card"
    >
      <motion.div
        whileHover={{ scale: 1.12, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="w-9 h-9 rounded-xl bg-cobalt-900/30 border border-cobalt-800 flex items-center justify-center shrink-0"
      >
        <Icon size={15} className="text-neon-cyan" strokeWidth={1.75} />
      </motion.div>
      <div className="flex-1 min-w-0">
        <p className="text-2xs font-mono text-slate-400 uppercase tracking-widest">{label}</p>
        {href ? (
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-sm font-medium text-white hover:text-neon-cyan transition-colors duration-150 truncate block"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm font-medium text-white truncate">{value}</p>
        )}
      </div>
    </motion.div>
  );
}

function ContactForm() {
  const formRef = useRef(null);
  const [form, setForm]     = useState({ from_name: '', reply_to: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      setStatus('success');
      setForm({ from_name: '', reply_to: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  const inputCls = (field) =>
    `w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all duration-200 text-white placeholder:text-slate-500 bg-slate-800/50 focus:outline-none ${
      focused === field
        ? 'border-neon-cyan ring-2 ring-neon-cyan/20 shadow-sm'
        : 'border-slate-700'
    }`;

  const isConfigured = SERVICE_ID && SERVICE_ID !== 'your_service_id';

  return (
    <motion.form
      ref={formRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15, duration: 0.55 }}
      onSubmit={handleSubmit}
      className="card-base bg-slate-900/80 backdrop-blur-md border border-slate-800 p-6 space-y-4"
      aria-label="Contact form"
      noValidate
    >
      {/* Config warning — only shown in dev if keys not yet set */}
      {!isConfigured && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-100">
          <AlertCircle size={14} className="text-amber-600 mt-0.5 shrink-0" strokeWidth={2} />
          <p className="text-xs text-amber-700 leading-relaxed">
            <strong>Setup required:</strong> Add your EmailJS keys to the <code className="bg-amber-100 px-1 rounded">.env</code> file to activate this form.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300 mb-1.5">
            Name <span className="text-red-400">*</span>
          </label>
          <motion.input
            id="contact-name"
            name="from_name"
            type="text"
            required
            autoComplete="name"
            value={form.from_name}
            onChange={handleChange}
            onFocus={() => setFocused('from_name')}
            onBlur={() => setFocused(null)}
            placeholder="Your name"
            whileFocus={{ scale: 1.01 }}
            className={inputCls('from_name')}
            disabled={status === 'sending'}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300 mb-1.5">
            Email <span className="text-red-400">*</span>
          </label>
          <motion.input
            id="contact-email"
            name="reply_to"
            type="email"
            required
            autoComplete="email"
            value={form.reply_to}
            onChange={handleChange}
            onFocus={() => setFocused('reply_to')}
            onBlur={() => setFocused(null)}
            placeholder="you@example.com"
            whileFocus={{ scale: 1.01 }}
            className={inputCls('reply_to')}
            disabled={status === 'sending'}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300 mb-1.5">
          Message <span className="text-red-400">*</span>
        </label>
        <motion.textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          value={form.message}
          onChange={handleChange}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused(null)}
          placeholder="Your message..."
          whileFocus={{ scale: 1.01 }}
          className={`${inputCls('message')} resize-none`}
          disabled={status === 'sending'}
        />
      </div>

      {/* Submit button */}
      <motion.button
        type="submit"
        id="contact-submit-btn"
        disabled={status === 'sending' || status === 'success'}
        whileHover={status === 'idle' ? { scale: 1.02, y: -1 } : {}}
        whileTap={status === 'idle' ? { scale: 0.97 } : {}}
        className={`btn-primary w-full justify-center transition-all duration-200 ${
          status === 'sending' ? 'opacity-75 cursor-not-allowed' : ''
        } ${status === 'success' ? 'bg-green-600 hover:bg-green-600 cursor-not-allowed' : ''}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {status === 'idle' && (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2">
              <Send size={14} strokeWidth={2} /> Send Message
            </motion.span>
          )}
          {status === 'sending' && (
            <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2">
              <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="inline-flex">
                <Loader size={14} strokeWidth={2} />
              </motion.span>
              Sending…
            </motion.span>
          )}
          {status === 'success' && (
            <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2">
              <CheckCircle size={14} strokeWidth={2} /> Message Sent!
            </motion.span>
          )}
          {status === 'error' && (
            <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2">
              <AlertCircle size={14} strokeWidth={2} /> Try Again
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Status messages */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="flex items-start gap-2.5 p-3.5 rounded-xl bg-green-50 border border-green-100"
          >
            <CheckCircle size={15} className="text-green-600 mt-0.5 shrink-0" strokeWidth={2} />
            <div>
              <p className="text-sm font-semibold text-green-800">Message delivered! 🎉</p>
              <p className="text-xs text-green-700 mt-0.5 leading-relaxed">
                Thank you for reaching out. Thanuja will get back to you soon.
              </p>
            </div>
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-100"
          >
            <AlertCircle size={15} className="text-red-500 mt-0.5 shrink-0" strokeWidth={2} />
            <div>
              <p className="text-sm font-semibold text-red-700">Something went wrong.</p>
              <p className="text-xs text-red-600 mt-0.5 leading-relaxed">
                Please try again or email directly at{' '}
                <a href={`mailto:${personal.email}`} className="underline font-medium">{personal.email}</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-midnight text-white overflow-hidden relative">
      {/* Decorative mesh background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-neon-purple opacity-10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-cyan opacity-10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <SectionHeading
            label="Contact"
            title="Let's Connect"
            subtitle="Open to internships, collaborations, and conversations about data. Reach out through any of the channels below."
            dark
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-3">
            {contactInfo.map((item, i) => (
              <ContactInfoCard key={item.label} item={item} index={i} />
            ))}
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
