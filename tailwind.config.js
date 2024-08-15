/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './node_modules/preline/preline.js',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      screens: {
        phone: '414px'
      }
    }
  },
  plugins: [require('preline/plugin')]
}
