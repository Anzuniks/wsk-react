/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Otetaan värit suoraan index.css-tiedostosta
        // Näin voit käyttää niitä Tailwind-luokilla, esim. bg-accent, text-text
        'text': '#6b6375',
        'text-h': '#08060d',
        'bg': '#fff',
        'border': '#e5e4e7',
        'code-bg': '#f4f3ec',
        'accent': '#aa3bff',
        'accent-bg': 'rgba(170, 59, 255, 0.1)',
        'accent-border': 'rgba(170, 59, 255, 0.5)',
        'social-bg': 'rgba(244, 243, 236, 0.5)',
      }
    },
  },
  plugins: [],
}