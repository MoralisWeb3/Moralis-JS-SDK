export const config = {
  dependencies: { packages: { 'lodash.merge': '4.6.2', '@rainbow-me/rainbowkit': '0.12.2' }, prompts: ['wagmi'] },
  pages: {
    _app: {
      imports: [
        `import { RainbowKitProvider, Theme, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit';
        import merge from 'lodash.merge';
        import '@rainbow-me/rainbowkit/styles.css';`,
      ],
      config: [
        `const { chains, provider } = configureChains([mainnet, polygon, optimism, arbitrum], [publicProvider()])`,
        {
          id: 'connectors',
          code: `const { connectors } = getDefaultWallets({
                    appName: 'My RainbowKit App',
                    chains,
                });`,
        },
      ],
      wrappers: [[`<WagmiConfig client={wagmiClient}>`], [`</WagmiConfig>`]],
    },
    
  },
};
