/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    screens: {
      xs: "400px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      primary: "#fe6601",
      white: "#ffffff",
      black: "#000000",
      cedar: "#281e32",
      silver: "#7a7979",
      korma: "#86370e",
      porsche: "#ed9e67",
      matisse: "#1d5191",
    },
    spacing: {
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
    },
    extend: {},
  },
  plugins: [],
};
