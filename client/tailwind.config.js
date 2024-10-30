/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
        fancy: "Imperial Script",
        montserrat: "Montserrat",
      },
      colors: {
        brandGreen: "#061715",
      },
    },
  },
  plugins: [],
};
