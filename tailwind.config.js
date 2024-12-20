/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        tall: ["Oswald", "sans-serif"],
      },
      colors: {
        leaf: "#009d35",
        "leaf-900": "#00B83D",
        trunk: "#904c14",
        branch: "#b76d22",
        root: "#f0972f",
      },
      fill: {
        leaf: "#009d35",
      },
      container: {
        center: true,
        padding: "1rem",
      },
      gridTemplateColumns: {
        articles: "repeat(auto-fill, minmax(225px, 1fr))",
        buttons: "repeat(auto-fit, minmax(200px, 1fr))",
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
  plugins: [require("@tailwindcss/typography")],
};
