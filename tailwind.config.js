/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-slower': 'spin 2s linear infinite',
      }
},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

