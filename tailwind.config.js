/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'xs': '320px',
      },
      width:{
        '50/100': '50vw',
        '40/100': '40vw',
        '20/100': '20vw',
      },
      fontFamily: {
        custom: ['Montserrat Alternates', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        normal: 400,
        bold: 700,
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}

