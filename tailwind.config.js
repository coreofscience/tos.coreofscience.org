/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        tall: ["Oswald", "sans-serif"],
      },
      colors: {
        leaf: "#009d35",
        trunk: "#904c14",
        branch: "#b76d22",
        root: "#f0972f",
      },
      container: {
        center: true,
        padding: "1rem",
      },
      gridTemplateColumns: {
        articles: "repeat(auto-fill, minmax(225px, 1fr))",
      },
      animation: {
        "slide-up": "slide-up 0.5s ease-out",
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translate(-50%, 100%)" },
          "100%": { transform: "translate(-50%, -15%)" },
        },
      },
    },
  },
  plugins: [],
};
