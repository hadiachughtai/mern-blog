/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        primarydark: '#4338CA',
        accent: '#F43F5E'
      }
    }
  },
  plugins: []
};
