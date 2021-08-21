module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: "#333333",
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ["hover", "focus", "group-hover"],
    },
  },
  plugins: [],
};
