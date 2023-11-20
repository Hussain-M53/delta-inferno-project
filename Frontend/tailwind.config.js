/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'scrollbar-hide': { 'raw': '::-webkit-scrollbar' },
      },

      backgroundColor: {
        'bg-color': '#FFFFFF',
        'nav-color': '#000000',
        'btn-color': '#31C1D4',
        'footer-color': '#282425',
      },
      textColor: {
        'nav-color': '#282425',
        'btn-color': '#31C1D4',
        'footer-color1': '#3C3A3B',
        'footer-color2': '#0E78B9',

      },
      borderColor: {
        'nav-color': '#282425',
        'btn-color': '#31C1D4'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        updown: 'updown 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
