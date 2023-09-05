/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
        bottom: "bottom",
      },
      width: {
        "mobile-width": "390px",
      },
      height: {
        "mobile-height": "844px",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
