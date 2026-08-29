export function SectionHeading({ label, title, subtitle, className = '', align = 'left' }) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {label && (
        <span className="section-label">{label}</span>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className="section-subtitle max-w-xl">{subtitle}</p>
      )}
    </div>
  );
}
