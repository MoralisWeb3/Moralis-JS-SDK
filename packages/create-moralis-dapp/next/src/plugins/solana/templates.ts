export const imports = `
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React from 'react';
`;

export const config = `
const SolanaAdapterContext: FC<{ children: ReactNode }> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);

  const wallets = React.useMemo(
      () => [new UnsafeBurnerWalletAdapter()],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [network]
  );

  return (
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>{children}</WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
};
`

export const example = `
import { Default } from '../layouts';
import { useSolPortfolio } from '@moralisweb3/react';
import { useWallet } from '@solana/wallet-adapter-react';
import React from 'react';
import styles from './Home.module.css';

export default function Home() {
    const [solAddress, setSolAddress] = React.useState('BWeBmN8zYDXgx2tnGj72cA533GZEWAVeqR9Eu29txaen');
    const { publicKey } = useWallet();
    const { data: solPortfolio, refetch: fetchSolPortfolio, error: errorSolPortfolio } = useSolPortfolio({ address: solAddress }, { enabled: false });

    React.useEffect(() => {
        if (!publicKey) {
            return;
        }
        setSolAddress(publicKey?.toString());
    }, [publicKey]);

    return (
        <Default>
          <div className={styles.content}>
            <h4>Get Solana Portfolio</h4>
            <div className={styles.address_input}>
              <input name="solAddress" value={solAddress} onChange={(e) => setSolAddress(e.target.value)} />
              <button className={styles.search_btn} onClick={() => fetchSolPortfolio()}>
                🔎
              </button>
            </div>
            <h4>Result:</h4>
            {errorSolPortfolio ? (
              <pre data-out>{JSON.stringify(errorSolPortfolio)}</pre>
            ) : (
              <pre data-out>{solPortfolio ? JSON.stringify(solPortfolio, null, 2) : 'Click the "🔎" button to fetch data'}</pre>
            )}
          </div>
        </Default>
      );
}
`;