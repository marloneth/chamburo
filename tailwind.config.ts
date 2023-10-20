import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'vibrant-blue': '#007BFF',
        'warm-orange': ' #F58220',
        'off-white': '#F4F4F4',
        'accent-teal': '#33C1B7',
        'bright-yellow': '#FFAC33',
        'dark-gray': '#333333',
        'positive-green': '#4CAF50',
        'negative-red': '#FF3B30',
      },
    },
  },
  plugins: [],
}
export default config
