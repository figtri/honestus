import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [
    tailwindcssAnimate,
    typography,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      )
    },
  ],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
    // Fig theme colors
    'bg-fig-dark',
    'bg-fig-medium',
    'bg-fig-light',
    'text-fig-dark',
    'text-fig-medium',
    'text-fig-light',
    'border-fig-dark',
    'border-fig-medium',
    'border-fig-light',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      textShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.2)',
        DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.3)',
        lg: '0 4px 8px rgba(0, 0, 0, 0.4)',
        white: '0 2px 4px rgba(255, 255, 255, 0.3)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
        // Custom fig theme colors
        fig: {
          dark: '#152A20', // Deep fig leaf green
          medium: '#2D4F3F', // Medium fig green
          light: '#4D7868', // Lighter fig green
          accent: '#E27145', // Ripe fig color / orange-brown
          cream: '#F9F3E9', // Fig flesh color
          brown: '#6B4536', // Fig branch/stem color
        },
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-geist-sans)'],
        caveat: ['var(--font-caveat)', 'cursive'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        'fig-dark': {
          css: {
            '--tw-prose-body': '#152A20',
            '--tw-prose-headings': '#152A20',
            '--tw-prose-links': '#2D4F3F',
            '--tw-prose-bold': '#152A20',
            '--tw-prose-counters': '#152A20',
            '--tw-prose-bullets': '#152A20',
            '--tw-prose-hr': '#152A20',
            '--tw-prose-quotes': '#152A20',
            '--tw-prose-quote-borders': '#2D4F3F',
            '--tw-prose-captions': '#152A20',
            '--tw-prose-code': '#152A20',
            '--tw-prose-pre-code': '#152A20',
            '--tw-prose-pre-bg': '#F9F3E9',
            '--tw-prose-th-borders': '#152A20',
            '--tw-prose-td-borders': '#152A20',
          },
        },
        'fig-cream': {
          css: {
            '--tw-prose-body': '#F9F3E9',
            '--tw-prose-headings': '#F9F3E9',
            '--tw-prose-links': '#E27145',
            '--tw-prose-bold': '#F9F3E9',
            '--tw-prose-counters': '#F9F3E9',
            '--tw-prose-bullets': '#F9F3E9',
            '--tw-prose-hr': '#F9F3E9',
            '--tw-prose-quotes': '#F9F3E9',
            '--tw-prose-quote-borders': '#E27145',
            '--tw-prose-captions': '#F9F3E9',
            '--tw-prose-code': '#F9F3E9',
            '--tw-prose-pre-code': '#F9F3E9',
            '--tw-prose-pre-bg': '#152A20',
            '--tw-prose-th-borders': '#F9F3E9',
            '--tw-prose-td-borders': '#F9F3E9',
          },
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      }),
      backgroundImage: {
        'fig-pattern':
          "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23154731' fill-opacity='0.08' fill-rule='evenodd'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/svg%3E\")",
        'fig-leaves':
          "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 3C27.4 3 9 21.4 9 44c0 22.6 18.4 41 41 41s41-18.4 41-41C91 21.4 72.6 3 50 3z' fill='%23154731' fill-opacity='0.05' /%3E%3C/svg%3E\")",
      },
    },
  },
}

export default config
