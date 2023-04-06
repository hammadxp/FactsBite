/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./public/index.html"],
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
