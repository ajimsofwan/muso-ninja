/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0d9488",
        "primary-light": "#14b8a6",
        "primary-extra-light": "#5eead4",
        "primary-dark": "#0f766e",
      },
      animation: {
        "spin-slow": "spin 1s ease infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
