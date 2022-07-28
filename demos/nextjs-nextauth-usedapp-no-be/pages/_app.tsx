import '../styles/globals.css';
import { ethers } from 'ethers';
import { SessionProvider } from 'next-auth/react';
import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';
import { Mainnet, DAppProvider, Config } from '@usedapp/core';
import { getDefaultProvider } from 'ethers';

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
  },
  autoConnect: true,
};

const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Component {...pageProps} />
        </SessionProvider>
      </Web3ReactProvider>
    </DAppProvider>
  );
}

export default MyApp;
