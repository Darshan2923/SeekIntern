/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#141414",
        'custpurple': '#7C0397',
        'cust2purple': '#BE1ADB',
        'mainbg': '#EFEFEF',
        'primarygreen': '#31B465',
        'selected': '#0A0A0A',
      },

    },
  },
  plugins: [],
}