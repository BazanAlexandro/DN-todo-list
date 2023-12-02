/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#ed9e6f',
          500: '#ed762f'
        },
        mainBg: 'var(--main-background)'
      }
    },
  },
  plugins: [],
}

