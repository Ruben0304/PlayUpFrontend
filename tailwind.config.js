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
          DEFAULT: '#F93D3D', // Nuevo color principal
          '50': '#FEE7E7',
          '100': '#FED0D0',
          '200': '#FCA3A3',
          '300': '#FB7575',
          '400': '#FA4848',
          '500': '#F93D3D', // Color principal
          '600': '#F70F0F',
          '700': '#C50808',
          '800': '#930606',
          '900': '#610404',
        },
      },
    },
  },
  plugins: [],
}