import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          light: 'var(--color-primary-light)',
          soft: 'var(--color-primary-soft)',
        },
        page: {
          DEFAULT: 'var(--color-page-bg)',
          soft: 'var(--color-page-bg-soft)',
        },
        card: {
          DEFAULT: 'var(--color-card-bg)',
          border: 'var(--color-card-border)',
          borderSoft: 'var(--color-card-border-soft)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          disabled: 'var(--color-text-disabled)',
        },
        divider: 'var(--color-divider)',
        success: {
          DEFAULT: 'var(--color-success)',
          bg: 'var(--color-success-bg)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          bg: 'var(--color-warning-bg)',
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
          bg: 'var(--color-danger-bg)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          bg: 'var(--color-info-bg)',
        },
        purple: {
          DEFAULT: 'var(--color-purple)',
          bg: 'var(--color-purple-bg)',
        },
        neutral: {
          DEFAULT: 'var(--color-neutral)',
          bg: 'var(--color-neutral-bg)',
        },
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        floating: 'var(--shadow-floating)',
      },
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        md: 'var(--font-size-md)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
      },
    },
  },
  plugins: [],
} satisfies Config
