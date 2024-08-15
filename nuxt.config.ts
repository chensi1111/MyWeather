// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: ['@fortawesome/fontawesome-free/css/all.min.css'],
  plugins: ['~/plugins/preline.client.ts'],
  postcss: {
    plugins: {
      autoprefixer: {}
    }
  }
})
