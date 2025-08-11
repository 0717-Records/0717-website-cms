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
      colors: {},
      fontVariant: {
        'small-caps': 'small-caps',
        normal: 'normal',
      },
    },
  },
  plugins: [typography],
};

export default config;
