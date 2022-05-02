module.exports = {
  title: 'GenKit 文档',
  tagline: 'GenKit 群组文档',
  url: 'https://genkit.vercel.app/',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'GenKit', // Usually your GitHub org/user name.
  projectName: 'GenKit', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'GenKit',
      logo: {
        alt: 'GenKit',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/about',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/Grasscutters/Grasscutter',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '关于',
              to: 'docs/about',
            },
            {
              label: '快速上手',
              to: 'docs/quick-start',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'TG 发布频道',
              href: 'https://t.me/genkitCN',
            },
            {
              label: 'TG 讨论组',
              href: 'https://t.me/genkitCN_chat',
            },
            {
              label: 'TG 讨论组(人多|临时)',
              href: 'https://t.me/genshinhelper',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} GenKit, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/Wansn-w/gcdoc/edit/main/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/Wansn-w/gcdoc/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
