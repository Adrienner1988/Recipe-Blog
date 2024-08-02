/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      darkPlum: "#860a35",
      lightPlum: "#aF2655",
      pink: "#ff49db",
      green: "#a3B763",
      grayDark: "#273444",
      gray: "#8492a6",
      grayLight: "#d3dce6",
    },
    fontFamily: {
      eduHand: ["Edu AU VIC WA NT Hand", "cursive"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      height: {
        "350px": "350px"
      }
    },
  },
  plugins: [],
};
