/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}", "!./node_modules/**/*"],
  darkMode: "class",
  theme: {
    fontSize: {
      xs: "0.7rem",
      sm: "0.9rem",
      lg: "1.3rem",
      xl: "1.5rem",
    },
    fontFamily: {
      body: ["Poppins", "sans-serif"],
      brand: ["Quicksand", "Poppins", "sans-serif"],
      typewriter: ["Geist Mono", "sans-serif"],
    },
    extend: {
      fontSize: {
        tiny: "0.625rem",
        medium: "1.4rem",
        bigger: "2.8rem",
        huge: "3.5rem",
        massive: "5rem",
      },
      letterSpacing: {
        custom: "0.2rem",
      },
      colors: {
        bg: {
          dark1: "#24243e",
          dark2: "#302b63",
          dark3: "#0f0c29",
        },
        text: {
          dark: "#ffffff",
          light: "#000000",
        },
        accent: {
          dark: "#33e94e",
          light: "#e9b61c",
        },
      },
    },
  },
  plugins: [],
};
