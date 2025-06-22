// nuxt.config.ts
export default defineNuxtConfig({
  css: ['vuetify/styles'],
  build: {
    transpile: ['vuetify'],
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
})
