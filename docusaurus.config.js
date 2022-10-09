// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'GenKit Wiki',
  tagline: '一个 Grasscutter 的非官方中文百科',
  url: 'https://wiki.genkit.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'GenKit', // Usually your GitHub org/user name.
  projectName: 'gcdoc', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    localeConfigs: {
      zh: {
        htmlLang: 'zh-CN',
      },
      // You can omit a locale (e.g. fr) if you don't need to override the defaults
      en: {
        htmlLang: 'en-US',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/GenKitCN/gcdoc/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/GenKitCN/gcdoc/tree/main/blog',
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
      docs:
        {
          sidebar:
            {
              hideable: true,
            }
        },
      navbar: {
        title: 'GenKit',
        logo: {
          alt: 'Grasscutter Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: '文档',
          },
          {to: '/artifact', label: '圣遗物在线生成', position: 'left'},
          //{to: '/auth', label: '🔑 GCAuth', position: 'left'},
          //{to: 'https://blog.genkit.org', label: '博客', position: 'left'},
          {to: '/awesome', label: '资源索引', position: 'left'},
          {to: 'https://file.genkit.org', label: '资源站', position: 'left'},
          {
            href: 'https://genkitCN.t.me',
            label: 'Telegram',
            position: 'right',
          },
        ],
        hideOnScroll: true,
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {
                label: '🚜‍ 快速开始',
                to: '/docs',
              },
              {
                label: '🏷️ 关于',
                to: '/docs/about',
              },
              {
                label: '❓ FAQ',
                to: '/docs/faq/index',
              },
            ],
          },
          {
            title: '交流',
            items: [
              {
                label: '✈️ Telegram 频道',
                href: 'https://t.me/genkitCN',
              },
              {
                label: '👥 Telegram 讨论组',
                href: 'https://t.me/genkitCN_chat',
              },
              {
                label: '👥 E Mail',
                href: 'mailto:i@genkit.org',
              }
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: 'Grasscutter GitHub',
                href: 'https://github.com/Grasscutters/Grasscutter',
              },
              {
                label: 'GenKit GitHub',
                href: 'https://github.com/GenKitCN',
              },
              {
                label: 'GenKit 资源站',
                to: 'https://file.genkit.org',
              }
            ],
          },
        ],
        copyright: `Powered by Docusaurus | © 2022-${new Date().getFullYear()} <a style='color:white' href="htps://genkit.org">GenKit</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
    themes: [
    // ... Your other themes.
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        language: ["en", "zh"],
        // ```
      },
    ],
  ],
  plugins: [
    async function myPlugin(context, options) {
      // ...
      return {
        name: 'GenKit-Trace',
        injectHtmlTags({content}) {
          return {
            headTags: [
              {
                tagName: 'script',
                attributes: {
                  async: true,
                  "data-website-id": "1fce29b9-3ad3-4783-a8da-ac3096c4fc0e",
                  src: "https://umami.chitang.dev/umami.js",
                },
              },
            ]
          };
        },
      };
    },
  ],
};

module.exports = config;
