/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 🟢 تعريف خط Tajawal كخط أساسي للتطبيق بالكامل
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}