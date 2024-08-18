/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,html}"],
  theme: {
    fontFamily: {
      openSans: ['Open Sans', "sans-serif"]
    },
    extend: {
      fontSize: {
        'h1': '28px'
      },
      backgroundColor: {
        'primary': '#00A88E'
      }
    },
  },
  plugins: [],
}
