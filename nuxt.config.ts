// https://nuxt.com/docs/api/configuration/nuxt-config
import {nodePolyfills} from 'vite-plugin-node-polyfills';
export default defineNuxtConfig({
  css: ['@/assets/style.css'],
  compatibilityDate: '2024-04-03',

  // devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxt/icon',
    '@prisma/nuxt',
    '@pinia/nuxt',
  ],

  runtimeConfig: {
    saltRounds: 13,
    JWT_SECRET: 'Vy7YsOGTc4Aem26Im5lILQ'
  },
  app: {
    head: {
      title: 'Nuxt Chat',
      meta: [{charset: 'utf-8'}]
    },
    pageTransition: { name: 'auth', mode: 'out-in' },
    
  },

  googleFonts: {
    families: {
      Inter: [400],
      "Public Sans": [400, 700]
    }
  },

  icon: {
    serverBundle: {
      
      collections: ['vscode-icons', 'material-symbols', 'uiw']
    }
  },

  nitro: {
    experimental: {
      websocket: true
    },
  },
  image: {
    domains: ['http://localhost:3000']
  },
  devtools: {
    enabled: true
  }
});
