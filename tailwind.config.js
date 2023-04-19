/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/components/game/**/*.{js,jsx,ts,tsx}",
    "./src/components/game/cardcomponents/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
    pattern:/((w|h)-\d*)|(top-\[\d*%\])|(\w*rotate-\[\d*deg\])/,
    }
  ]
}
