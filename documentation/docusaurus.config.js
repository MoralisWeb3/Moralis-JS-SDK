// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const moralisPackage = require('../packages/moralis/package.json');

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Moralis SDK (JavaSDKScript / TypeScript)',
  tagline: 'A library that gives you access to the powerful Moralis Server backend from your JavaScript app.',
  url: 'https://docs.moralis.io/',
  baseUrl: '/Moralis-JS-SDK',
  // Use for serving locally:
  // baseUrl: '/docs-build/',
  onBrokenLinks: 'warn',
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

  // Plugins
  plugins: [require.resolve('docusaurus-lunr-search')],
  // Note: Docusaurus search information can only be generated from a production build. Local development is currently not supported.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
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
      metadata: [{ name: 'keywords', content: moralisPackage.keywords.join(', ') }],
      navbar: {
        title: 'Moralis JS SDK',
        logo: {
          href: '/',
          alt: 'Moralis',
          src: 'img/moralis-logo.svg',
        },

        items: [
          {
            type: 'doc',
            docId: 'api/modules',
            position: 'left',
            label: 'Modules',
          },
          {
            type: 'doc',
            docId: 'demos/express-proxy',
            position: 'left',
            label: 'Demos',
          },

          {
            position: 'right',
            label: 'Moralis docs',
            items: [
              {
                href: 'https://docs.moralis.io/docs',
                label: 'Tutorials',
              },
              {
                href: 'https://docs.moralis.io/reference/introduction',
                label: 'API references',
              },
              {
                label: 'Javascript SDK',
                docId: 'api/modules',
                type: 'doc',
              },
              {
                label: 'Python SDK',
                href: 'https://moralisweb3.github.io/Moralis-Python-SDK/',
              },
            ],
          },
          {
            href: 'https://github.com/MoralisWeb3/Moralis-JS-SDK',
            position: 'right',
            'aria-label': 'GitHub repository',
            className: 'header-github-link',
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
            title: 'Support',
            items: [
              {
                label: 'Join Forum',
                href: 'https://forum.moralis.io/',
              },
              {
                label: 'Join Discord',
                href: 'https://moralis.io/joindiscord/',
              },
              {
                label: 'Contact 24/7 Support',
                href: 'https://moralis.io/support',
              },
            ],
          },
          {
            title: 'Social',
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
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/moralisweb3/',
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
        copyright: `© Moralis Copyright ${new Date().getFullYear()}. All rights reserved`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
