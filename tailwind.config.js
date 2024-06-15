/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  corePlugins: {
    preflight: false, // Tắt các CSS mặc định
  },
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}

