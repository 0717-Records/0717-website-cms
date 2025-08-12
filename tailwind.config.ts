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
      // Brand Colors - Single source of truth (add to globals.css if CSS variables needed)
      colors: {
        brand: {
          primary: '#FFEA00',
          secondary: '#F4A300',
        },
      },
      // Brand Gradient - Single source of truth
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, #FFEA00, #FFC800)',
      },
    },
  },
  plugins: [typography],
};

export default config;
