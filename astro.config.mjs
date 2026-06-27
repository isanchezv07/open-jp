// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  integrations: [
    react(),
  ],
  redirects: {
    "/": "/es"
  },
  vite: {
    plugins: [
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',

        manifest: {
          name: 'open-jp',
          short_name: 'open-jp',
          description: 'A Japanese practice app',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',

          icons: [
            {
              src: '/favicon.svg',
              sizes: '192x192',
              type: 'image/svg+xml'
            },
            {
              src: '/favicon.svg',
              sizes: '512x512',
              type: 'image/svg+xml'
            }
          ]
        },

        workbox: {
          navigateFallback: '/404',
          globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}']
        },

        devOptions: {
          enabled: true,
          navigateFallbackAllowlist: [/^\//]
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: true
    },
  },
  devToolbar: {
    enabled: false,
  },
});