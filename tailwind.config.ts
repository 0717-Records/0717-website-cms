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
          DEFAULT: '#ffffff',
          secondary: '#f8f9fa',
        },
        foreground: {
          DEFAULT: '#000000',
          muted: '#6b7280',
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
          DEFAULT: '#f3f4f6',
          foreground: '#6b7280',
        },
        accent: {
          DEFAULT: '#fcd34d',
          foreground: '#000000',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        border: '#e5e7eb',
        input: '#f9fafb',
        ring: '#fbbf24',
      },
      fontVariant: {
        'small-caps': 'small-caps',
        normal: 'normal',
      },
    },
  },
  plugins: [typography],
};

export default config;
