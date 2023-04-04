/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Rubik: "Rubik, sans-serif",
        Sono: "Sono, sans-serif",
      },
    },
  },
  plugins: [],
};
