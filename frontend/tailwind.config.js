/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors"

module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        primary: colors.slate[950],
        secondary: colors.slate[800]
      }
    },
  },
  plugins: [],
}