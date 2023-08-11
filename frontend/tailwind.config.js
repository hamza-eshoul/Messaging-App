/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryDark: "#1A1B1C",
        primaryOrange: "#fa4d12",
        secondaryOrange: "#eb430b",
      },
    },
  },
  plugins: [],
};
