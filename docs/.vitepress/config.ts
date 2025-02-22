import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Nuxt Feature Flags',
  description: 'A feature flag module for Nuxt 3 with static and dynamic flag evaluation, server-side support, and type safety',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Config', link: '/config/' }
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/guide/' },
          { text: 'Features', link: '/guide/features' }
        ]
      },
      {
        text: 'Configuration',
        items: [
          { text: 'Module Options', link: '/config/' }
        ]
      },
      {
        text: 'Usage',
        items: [
          { text: 'Basic Usage', link: '/usage/' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/rxb3rth/nuxt-feature-flags' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Roberth González'
    }
  }
})