// import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { Option } from '../../elements';
import { Connector, useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import styles from './Authentication.module.css';
import apiPost from '../../../utils/apiPost';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const wallets = [
  {
    name: 'Metamask',
    logoPath: '/assets/wallets/metamask.svg',
    connector: new MetaMaskConnector(),
  },
  {
    name: 'Coinbase Wallet',
    logoPath: '/assets/wallets/coinbase.svg',
    disabled: true,
    // connector: new CoinbaseWalletConnector(),
  },
  {
    name: 'WalletConnect',
    logoPath: '/assets/wallets/walletconnect.svg',
    disabled: true,
    // connector: new WalletConnectConnector(),
  },
  {
    name: 'Injected',
    logoPath: '/assets/wallets/eth.svg',
    connector: new InjectedConnector(),
  },
];
const Authentication = () => {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();

  const handleAuth = async (connector?: Connector, disabled?: boolean) => {
    if (disabled) {
      alert('Setup it first in the Authentication.tsx');
      return;
    }

    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({ connector });

    const userData = { address: account, chain: chain.id, network: 'evm' };

    const { message } = await apiPost('/auth/request-message', userData);

    const signature = await signMessageAsync({ message });

    try {
      await signIn('credentials', { message, signature, redirect: false });
      // redirects to main page
      push('/');
    } catch (e) {
      return;
    }
  };

  return (
    <div className={styles.auth}>
      <h3 className={styles.title}>Web3 Authentication</h3>
      <div className={styles.options}>
        {wallets.map(({ name, logoPath, connector, disabled }) => (
          <Option
            disabled={disabled}
            key={name}
            logoPath={logoPath}
            name={name}
            onClick={() => handleAuth(connector, disabled)}
          />
        ))}
      </div>
    </div>
  );
};

export default Authentication;
