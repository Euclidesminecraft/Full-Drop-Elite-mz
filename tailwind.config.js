/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rajdhani', 'sans-serif'],
        display: ['Teko', 'sans-serif'],
      },
      colors: {
        'fde-purple': '#9333ea',
        'fde-black': '#000000',
        'fde-darkgray': '#121212',
        'fde-lightgray': '#27272a',
      }
    },
  },
  plugins: [],
}