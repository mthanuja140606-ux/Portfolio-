/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Editorial warm off-white palette
        canvas: {
          DEFAULT: '#FAF9F6',
          50: '#FDFCFA',
          100: '#FAF9F6',
          200: '#F3F1EC',
          300: '#E8E5DD',
        },
        // Deep charcoal text
        ink: {
          DEFAULT: '#1C1917',
          light: '#44403C',
          muted: '#78716C',
          faint: '#A8A29E',
        },
        // Cobalt blue accent
        cobalt: {
          DEFAULT: '#2563EB',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Data viz secondary accent (amber)
        data: {
          DEFAULT: '#D97706',
          light: '#FEF3C7',
          mid: '#F59E0B',
        },
        // Neutral borders
        border: {
          DEFAULT: '#E7E5E1',
          light: '#F0EEE9',
          dark: '#C9C6BF',
        },
        // Premium Dark Mode
        midnight: {
          DEFAULT: '#0B1121',
          light: '#1E293B',
          muted: '#334155',
        },
        // Vibrant neon accents
        neon: {
          cyan: '#22d3ee',
          purple: '#c084fc',
          pink: '#f472b6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        '10xl': ['10rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'editorial': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)',
        'card': '0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'elevated': '0 8px 24px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'cobalt': '0 4px 16px rgba(37, 99, 235, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      letterSpacing: {
        'editorial': '0.08em',
        'widest': '0.15em',
      },
    },
  },
  plugins: [],
}
