/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Rubik: "Rubik, sans-serif",
        Sono: "Sono, sans-serif",
      },
    },
    screens: {
      "1344px": { max: "1344px" },
      "1200px": { max: "1200px" },
      "950px": { max: "950px" },
      "704px": { max: "704px" },
      "500px": { max: "500px" },
    },
  },
  plugins: [],
};
