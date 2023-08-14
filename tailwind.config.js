/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        'primary': '#262150',
        'secondary': '#a88f5e',
      },
      backgroundColor:{
        'primary': '#262150',
        'secondary': '#a88f5e',
      },
      borderColor:{
        'primary': '#262150',
        'secondary': '#a88f5e',
      },
      screens:{
        'xs': '320px',
      },
      width:{
        '50/100': '50vw',
        '40/100': '40vw',
        '20/100': '20vw',
      },
      fontFamily: {
        'custom-bold': ['Adam-Bold', 'sans'],
        'custom-light': ['Adam-Light', 'sans'],
        'custom': ['Adam-Medium', 'sans'],
        // Add more custom fonts as needed
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

