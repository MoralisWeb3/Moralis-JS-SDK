import { AppWrapper, Web3LibraryConfig } from '../../types';
import { wagmiConfig } from '../wagmi';

export const wagmiWithRainbowKitConfig: Web3LibraryConfig = {
  name: 'wagmi-with-rainbowkit',
  template: wagmiConfig.template,
  dependencies: [...(wagmiConfig.dependencies as string[]), 'wagmi', 'lodash.merge', '@rainbow-me/rainbowkit'],
  _app: {
    wrappers: [
      ...(wagmiConfig._app.wrappers as AppWrapper[]),
      {
        name: 'RainbowKitProvider',
        props: [
          { name: 'chains', value: 'chains' },
          { name: 'theme', value: 'rainbowTheme' },
        ],
      },
    ],
    imports: `
      import { WagmiConfig, configureChains, createClient } from 'wagmi';
      import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';
      import { publicProvider } from 'wagmi/providers/public';
      import { RainbowKitProvider, Theme, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit';
      import merge from 'lodash.merge';
      import '@rainbow-me/rainbowkit/styles.css';
    `,
    configs: `
      const { chains, provider } = configureChains([mainnet, polygon, optimism, arbitrum], [publicProvider()])
      const { connectors } = getDefaultWallets({
        appName: 'My RainbowKit App',
        chains,
      });
      const wagmiClient = createClient({
          autoConnect: true,
          connectors,
          provider,
      });
      const rainbowTheme: Theme = merge(darkTheme(), {
        colors: {
            connectButtonBackground: '#19212c',
         },
      });
    `,
  },
};
