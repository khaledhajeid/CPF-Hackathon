/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 🟢 اعتماد خط Cairo كخط أساسي للتطبيق بالكامل
      fontFamily: {
        sans: ['Cairo', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}