/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    screens: {
      xxs: "200px",
      xs: "400px",
      sm: "480px",
      md: "756px",
      lg: "900px",
      xl: "1000px",
    },
    colors: {
      primary: "#fe6601",
      orange: "#c2410c",
      white: "#FDFFF5",
      black: "#000000",
      cedar: "#281e32",
      boulder: "#7a7979",
      silver: "#bcbcbc",
      korma: "#86370e",
      porsche: "#ed9e67",
      matisse: "#1d5191",
      danger: "#ff0000",
    },
    fontFamily: {
      sans: ["Barlow", "sans-serif"],
      condensed: ["Barlow Condensed", "sans-serif"],
    },
    spacing: {
      0: "0rem",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      11: "2.75rem",
      12: "3rem",
      13: "3.5rem",
    },
    extend: {
      screens: {
        lg: "756px",
      },
      spacing: {
        14: "4.5rem",
        15: "7.5rem",
        52: "13rem",
        60: "18rem",
        72: "55rem",
        20: "25rem",
        100: "6.70rem",
        999: "550px",
        998: "400px",
      },

      textShadow: {
        black: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      },
      opacity: {
        10: "0.12",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
