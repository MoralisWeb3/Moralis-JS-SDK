// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Moralis SDK (JavaScript / TypeScript)',
  tagline: 'A library that gives you access to the powerful Moralis Server backend from your JavaScript app.',
  url: 'https://docs.moralis.io/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'MoralisWeb3', // Usually your GitHub org/user name.
  projectName: 'Moralis-JS-SDK', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Moralis SDK',
        logo: {
          href: '/',
          alt: 'Moralis',
          src: 'img/moralis-logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'nodejs-sdk-references',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'doc',
            docId: 'demos/express-proxy',
            position: 'left',
            label: 'Demos',
          },
          { href: 'https://moralis.io/blog/', label: 'Blog', position: 'left' },
          {
            href: 'https://moralis.io/',
            label: 'Moralis',
            position: 'right',
          },
          {
            href: 'https://github.com/MoralisWeb3/Moralis-JS-SDK',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        },
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'NodeJS SDK',
                to: '/docs/nodejs-sdk-references',
              },
              {
                label: 'Demos',
                to: '/docs/demos/express-proxy',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Youtube',
                href: 'https://www.youtube.com/channel/UCgWS9Q3P5AxCWyQLT2kQhBw',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/MoralisWeb3',
              },
              {
                label: 'Linked in',
                href: 'https://www.linkedin.com/company/moralisweb3/',
              },
              {
                label: 'Discord',
                href: 'https://moralis.io/joindiscord/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Moralis',
                href: 'https://moralis.io/',
              },
              {
                label: 'Blog',
                href: 'https://moralis.io/blog/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/MoralisWeb3/Moralis-JS-SDK',
              },
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/moralis',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
