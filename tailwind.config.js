/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        epilogue: ["Epilogue", "sans-serif"],
      },
      boxShadow: {
        secondary: "10px 10px 20px rgba(2, 2, 2, 0.25)",
      },
      backgroundColor: {
        light: "#eeeeee",
        primary: "#dddddd",
        secondary: "#cccccc",
        primaryLogo: "#030720",
        secondaryLogo: "#0097b2",
      },
    },
  },
  plugins: [],
};
