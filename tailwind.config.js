/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    screens: {
      xxs: "200px",
      xs: "400px",
      sm: "480px",
      md: "768px",
      lg: "900px",
      xl: "1000px",
    },
    colors: {
      primary: "#fe6601",
      white: "#ffffff",
      black: "#000000",
      cedar: "#281e32",
      boulder: "#7a7979",
      silver: "#bcbcbc",
      korma: "#86370e",
      porsche: "#ed9e67",
      matisse: "#1d5191",
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
    },
    extend: {
      screens: {
        lg: "756px",
      },
      spacing: {
        14: "4.5rem",
        15: "7.5rem",
        100: "6.70rem",
      },
      textShadow: {
        black: "5px 5px 10px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
