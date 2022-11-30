import { DependencyName } from '../../utils';

export type Web3LibSchema = Record<
  string,
  { name: DependencyName; imports: string; config: string; wrappers: string[] }
>;

export const web3LibSchema: Web3LibSchema = {
  wagmi: {
    name: 'wagmi',
    imports: `
      import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi';
      import { publicProvider } from 'wagmi/providers/public';`,
    config: `
      const { provider, webSocketProvider } = configureChains(defaultChains, [publicProvider()]);
    
      const client = createClient({
        provider,
        webSocketProvider,
        autoConnect: true,
      });`,
    wrappers: [`<WagmiConfig client={client}>`, `</WagmiConfig>`],
  },
  useDapp: {
    name: '@usedapp/core',
    imports: `
      import { Mainnet, DAppProvider, Config } from '@usedapp/core';
      import { getDefaultProvider } from 'ethers';`,
    config: `
      const config: Config = {
        readOnlyChainId: Mainnet.chainId,
        readOnlyUrls: {
          [Mainnet.chainId]: getDefaultProvider('mainnet'),
        },
        autoConnect: true,
      };`,
    wrappers: [`<DAppProvider config={config}>`, `</DAppProvider>`],
  },
  web3React: {
    name: '@web3-react/core',
    imports: `
      import { ethers } from 'ethers';
      import { Web3ReactProvider } from '@web3-react/core';`,
    config: `
      const getLibrary = (wrappers: any) => {
        const library = new ethers.providers.Web3Provider(provider);
        library.pollingInterval = 8000; // frequency provider is polling
        return library;
      };`,
    wrappers: [`<Web3ReactProvider getLibrary={getLibrary}>`, `</Web3ReactProvider>`],
  },
};
