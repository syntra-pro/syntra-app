import { backIn } from 'framer-motion';
import type { Config } from 'tailwindcss';

const config = {
  // darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '@fileverse-dev/ddoc/dist/index.es.js',
  ],
  prefix: '',
  theme: {
    typography: {
      DEFAULT: {
        // this is for prose class
        css: {
          lineHeight: '1.5rem',

          menu: {
            listStyle: 'revert',
            margin: 'revert',
            padding: 'revert',
          },
          ol: {
            listStyle: 'revert',
            margin: 'revert',
            padding: 'revert',
          },
          ul: {
            listStyle: 'revert',
            margin: 'revert',
            padding: 'revert',
          },
          blockquote: {
            borderLeft: '4px solid #a8a29e', // stone-400 para modo claro
            paddingLeft: '1rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            fontStyle: 'italic',
            color: 'black',
            backgroundColor: '#cccccc57', // stone-100 para modo claro
            quotes: '"\\201C""\\201D""\\2018""\\2019"',
            borderRadius: '0.5rem',
            margin: '1rem',
          },
        },
      }, // this is for prose classs
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/typography'),
  ],
} satisfies Config;

export default config;
