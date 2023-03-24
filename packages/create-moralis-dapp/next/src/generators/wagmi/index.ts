import path from 'path';
import { Web3LibraryConfig } from '../../types';

export const wagmiConfig: Web3LibraryConfig = {
  name: 'wagmi',
  template: path.join(__dirname, 'template'),
  dependencies: ['ethers'],
  _app: {
    wrappers: [{ name: 'WagmiConfig', props: [{ name: 'client', value: 'wagmiClient' }] }],
    imports: `
      import { WagmiConfig, configureChains, createClient } from 'wagmi';
      import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';
      import { publicProvider } from 'wagmi/providers/public';
      import { InjectedConnector } from 'wagmi/connectors/injected';
    `,
    configs: `
      const connectors = [new InjectedConnector()];
      const { provider } = configureChains([mainnet, polygon, optimism, arbitrum], [publicProvider()]);
      const wagmiClient = createClient({
          autoConnect: true,
          connectors,
          provider,
      });
    `,
  },
};
