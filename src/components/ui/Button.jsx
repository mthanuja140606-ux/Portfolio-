export function Button({ children, variant = 'primary', href, onClick, className = '', download, target, rel, type = 'button', ...props }) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  };
  const cls = `${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls} download={download} target={target} rel={rel} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} {...props}>
      {children}
    </button>
  );
}
