/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar-hide")
  ],
  daisyui: {
    themes: ["light", "dark", "retro", "cyberpunk", "valentine", "aqua"], // or add more: ["light", "dark", "cupcake", "bumblebee"]
  },
}
