/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "Sans-Serif"],
      },
      fontWeight: {
        regular: "500",
        medium: "600",
      },
      colors: {
        webBackground: "#147452",
        Green: "#147452",
        text: "#4F4F4F",
        text1: "#696969",
        submenu: "#ACD7B7",
        table: "#d1fae5",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
