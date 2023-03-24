import path from 'path';
import { Web3LibraryConfig } from '../../types';

export const solanaWalletAdapter: Web3LibraryConfig = {
  name: 'solana',
  dependencies: [
    '@solana/wallet-adapter-base',
    '@solana/wallet-adapter-react',
    '@solana/wallet-adapter-react-ui',
    '@solana/wallet-adapter-wallets',
    '@solana/web3.js',
  ],
  template: path.join(__dirname, './template'),
  _app: {
    imports: `
      import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
      import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
      import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
      import '@solana/wallet-adapter-react-ui/styles.css';
      import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
      import { clusterApiUrl } from '@solana/web3.js';
    `,
    configs: `
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
    `,
    wrappers: [
      {
        name: 'SolanaAdapterContext',
      },
    ],
  },
};
