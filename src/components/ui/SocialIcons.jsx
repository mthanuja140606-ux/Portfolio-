import { GitFork, ExternalLink, Mail } from 'lucide-react';
import { socials } from '../../data/portfolio';

export function SocialIcons({ size = 18, className = '', iconClassName = '' }) {
  const links = [
    { href: socials.github, icon: GitFork, label: 'GitHub' },
    { href: socials.linkedin, icon: ExternalLink, label: 'LinkedIn' },
    { href: socials.email, icon: Mail, label: 'Email' },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
          className={`w-9 h-9 flex items-center justify-center rounded-xl border border-border bg-white text-ink-muted hover:text-cobalt-600 hover:border-cobalt-200 hover:bg-cobalt-50 transition-all duration-200 ${iconClassName}`}
        >
          <Icon size={size} strokeWidth={1.75} />
        </a>
      ))}
    </div>
  );
}
