const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "540px",
      ...defaultTheme.screens
    },
    extend: {
    }
  },
  plugins: [],
}
