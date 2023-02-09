import { Dependency } from '@create-moralis-dapp/toolkit';

export type Web3LibSchema = Record<
  string,
  { name: string; imports: string; config: string; wrappers: string[]; dependencies: Dependency[] }
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
    dependencies: [{ name: 'wagmi', version: '0.6.7' }],
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
    dependencies: [{ name: '@usedapp/core', version: '1.1.5' }],
  },

  web3React: {
    dependencies: [{ name: '@web3-react/core', version: '6.1.9' }],
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
