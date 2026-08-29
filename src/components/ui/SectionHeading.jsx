export function SectionHeading({ label, title, subtitle, className = '', align = 'left', dark = false }) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {label && (
        <span className={`font-mono text-2xs tracking-widest uppercase font-medium ${dark ? 'text-neon-cyan' : 'text-cobalt-600'}`}>
          {label}
        </span>
      )}
      <h2 className={`font-display text-3xl lg:text-4xl font-bold tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base lg:text-lg leading-relaxed max-w-xl ${dark ? 'text-slate-300' : 'text-ink-muted'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
