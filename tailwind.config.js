/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#EB6343',
          '50': '#FDE8E4',
          '100': '#FBD5CD',
          '200': '#F7B0A0',
          '300': '#F38B73',
          '400': '#EF6646',
          '500': '#EB6343', // Este es tu color principal
          '600': '#D14220',
          '700': '#9F3219',
          '800': '#6D2211',
          '900': '#3B120A',
        },
      },
    },
  },
  plugins: [],
}