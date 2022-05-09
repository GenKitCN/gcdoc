// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'GenKit Wiki',
  tagline: 'Grasscutter CN Wiki',
  url: 'https://genkit.mhysb.xyz',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'GenKit', // Usually your GitHub org/user name.
  projectName: 'gcdoc', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Wansn-w/gcdoc/tree/main/docs',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Wansn-w/gcdoc/tree/main/blog',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'GenKit',
        logo: {
          alt: 'Grasscutter',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'about',
            position: 'left',
            label: '文档',
          },
          {to: '/artifact', label: '圣遗物在线生成', position: 'left'},
          {to: '/auth', label: 'GCAuth', position: 'left'},
          {to: '/blog', label: '博客', position: 'left'},
          {
            href: 'https://t.me/genkitCN_chat',
            label: 'Telegram',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: '关于',
                to: '/docs/about',
              },
              {
                label: '快速开始',
                to: '/docs/quick-start/get-server',
              },
              {
                label: 'FAQ',
                to: '/docs/faq/error-4206',
              },
            ],
          },
          {
            title: '交流',
            items: [
              {
                label: 'Telegram 发布频道',
                href: 'https://t.me/genkitCN',
              },
              {
                label: 'Telegram 讨论组',
                href: 'https://t.me/genkitCN_chat',
              },
              {
                label: 'Telegram 讨论组(人多|临时)',
                href: 'https://t.me/genshinhelper',
              }
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Grasscutter GitHub',
                href: 'https://github.com/Grasscutters/Grasscutter',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} GenKit, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
