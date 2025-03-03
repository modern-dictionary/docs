import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Modern Dictionary Docs",
  description: "New Way Of Learning Words With Dictionary",
  themeConfig: {
      logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/guide/introduction' },
      { text: 'GitHub', link: 'https://github.com/modern-dictionary' },
      { text: 'Website', link: 'https://modern-dictionary.com/' }

    ],

    sidebar: [
      {
          text: 'Guide',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Configuration', link: '/guide/configuration' },
          ]
      },
        {
            text: 'Frontend',
            collapsed: false,
            items: [
                { text: 'Multi-language', link: '/guide/multilingual' },
                { text: 'Dark & Light Mode', link: '/guide/dark-mode' }
            ]
        },
      {
          text: 'Backend (Laravel)',
          collapsed: false,
          items: [
            { text: 'Authentication', link: '/guide/authentication' },
            { text: 'User Management', link: '/guide/users' },
            { text: 'Words & Categories', link: '/guide/words' },
            { text: 'Team Features', link: '/guide/teams' },
          ]
      },

      {
          text: 'Backend (Node.js)',
          collapsed: false,
          items: [
            { text: 'Node.js (WebSockets)', link: '/guide/nodejs' },
            { text: 'Database & Redis', link: '/guide/redis' },
          ]
      },
      {
          text: 'DevOps & Deployment',
          collapsed: false,
          items: [
            {text: 'Nginx & Reverse Proxy', link: '/guide/nginx'},
            {text: 'Cloud Storage', link: '/guide/cloud-storage'},
            {text: 'CI/CD Pipeline', link: '/guide/cicd'},
          ]
      },
      {
          text: 'Technical Details',
          collapsed: false,
          items: [
            { text: 'Project Architecture', link: '/guide/architecture' },
            { text: 'Data Flow & State Management', link: '/guide/data-flow' },
            { text: 'Real-time System Design', link: '/guide/realtime-design' },
            { text: 'Security Best Practices', link: '/guide/security' },
            { text: 'Performance Optimization', link: '/guide/performance' }
          ]
      }
        ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/modern-dictionary' },
    ],

    search: {
      provider: 'local'
    }
  }
})
