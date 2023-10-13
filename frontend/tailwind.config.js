/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryDark: "#1A1B1C",
        primaryOrange: "#fa4d12",
        secondaryOrange: "#eb430b",
        lightOrange: "#fcebe5",
        primaryGray: "#eff1f2",
      },
      screens: {
        "2xsm": "390px",
        xsm: "500px",
        xmd: "880px",
      },
    },
  },
  plugins: [],
};
