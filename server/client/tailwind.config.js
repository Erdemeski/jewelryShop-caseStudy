const flowbite = require("flowbite-react/tailwind");
const scrollbar = require('tailwind-scrollbar');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        'avenir': ['Avenir', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    scrollbar,
  ],
}