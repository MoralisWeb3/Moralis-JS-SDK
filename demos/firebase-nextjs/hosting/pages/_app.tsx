import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MoralisInitializer } from '../components/Moralis';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" />
      </Head>
      <MoralisInitializer initializing={<AppLoading />} initialized={<Component {...pageProps} />} />
    </>
  );
}

function AppLoading() {
  return <div>Loading app...</div>;
}
