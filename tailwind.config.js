import plugin from "tailwindcss";
import daisyui from "daisyui";

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./src/**/*.{css}"],
  theme: {
    extend: {
      fontFamily: {
        eduArrows: ["'Edu AU VIC WA NT Arrows'", "sans-serif"],
        fira: ["'Fira Code'", "monospace"],
        inconsolata: ["'Inconsolata'", "monospace"],
        monofett: ["'Monofett'", "cursive"],
        montserrat: ["'Montserrat'", "sans-serif"],
        parkinsans: ["'Parkinsans'", "sans-serif"],
      },
    },
  },
  plugins: [require('daisyui')],
};