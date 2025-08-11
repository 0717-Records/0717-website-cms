import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Signika', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: {
          DEFAULT: '#0a0a0a',
          secondary: '#1a1a1a',
        },
        foreground: {
          DEFAULT: '#fffbe9',
          muted: '#d4d4aa',
        },
        primary: {
          DEFAULT: '#fbbf24',
          foreground: '#0a0a0a',
        },
        secondary: {
          DEFAULT: '#f97316',
          foreground: '#fffbe9',
        },
        muted: {
          DEFAULT: '#2a2a2a',
          foreground: '#a3a3a3',
        },
        accent: {
          DEFAULT: '#fcd34d',
          foreground: '#0a0a0a',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#fffbe9',
        },
        border: '#3a3a3a',
        input: '#2a2a2a',
        ring: '#fbbf24',
      },
    },
  },
  plugins: [typography],
};

export default config;
