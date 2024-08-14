/** @type {import('tailwindcss').Config} */
export default {
  content: ['./node_modules/preline/preline.js'],
  theme: {
    extend: {
      screens: {
        phone: '414px'
      }
    }
  },
  plugins: [require('preline/plugin')]
}
