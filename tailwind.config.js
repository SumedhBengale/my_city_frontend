/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // define all fontSizes breakponts

    extend: {
      //Make all font sizes 20% smaller

      scale: {
        80: '.8',
      },
      colors: {
        'primary': '#262150',
        'secondary': '#c79744',
      },
      textColor: {
        'primary': '#262150',
        'secondary': '#c79744',
      },
      backgroundColor: {
        'primary': '#262150',
        'secondary': '#c79744',
      },
      borderColor: {
        'primary': '#262150',
        'secondary': '#c79744',
      },
      screens: {
        'xs': '320px',
      },
      width: {
        '50/100': '50vw',
        '40/100': '40vw',
        '30/100': '30vw',
        '20/100': '20vw',
      },
      fontFamily: {
        'custom-bold': ['Adam-Bold', 'sans'],
        'custom-light': ['Adam-Light', 'sans'],
        'custom': ['Adam-Medium', 'sans'],
        'custom-lora': ['Lora', 'serif'],
        'custom-lora-bold': ['Lora-Bold', 'serif'],
        'custom-kiona': ['Kiona', 'serif'],
        'custom-avenir': ['Avenir', 'serif'],
        'custom-avenir-bold': ['Avenir-Bold', 'serif'],
        'custom-avenir-light': ['Avenir-Light', 'serif'],
        'custom-adam': ['Adam-Regular', 'serif'],
        'custom-adam-bold': ['Adam-Bold', 'serif'],
        // Add more custom fonts as needed
      },
      fontWeight: {
        normal: 400,
        bold: 700,
      },
      margin: {
        '8/10': '80vh',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('@tailwindcss/typography')
  ]
}

