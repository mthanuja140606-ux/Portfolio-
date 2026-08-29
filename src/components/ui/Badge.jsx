export function Badge({ children, variant = 'cobalt', size = 'sm' }) {
  const variants = {
    cobalt: 'bg-cobalt-50 text-cobalt-700 border-cobalt-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    neutral: 'bg-canvas-200 text-ink-light border-border',
    green: 'bg-green-50 text-green-700 border-green-100',
  };
  const sizes = {
    xs: 'text-2xs px-2 py-0.5',
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
  };
  return (
    <span className={`inline-flex items-center font-medium rounded-lg border ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}
