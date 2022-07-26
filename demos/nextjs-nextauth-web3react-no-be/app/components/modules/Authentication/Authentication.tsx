import { connectors } from '../../../../connectors';
import { Option } from '../../elements';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import apiPost from '../../../utils/apiPost';
import styles from './Authentication.module.css';
import type { AbstractConnector } from '@web3-react/abstract-connector';

const wallets = [
  {
    name: 'Metamask',
    logoPath: '/assets/wallets/metamask.svg',
    connector: connectors.injected,
  },
  {
    name: 'Coinbase Wallet',
    logoPath: '/assets/wallets/coinbase.svg',
    // connector: new CoinbaseWalletConnector(),
  },
  {
    name: 'WalletConnect',
    logoPath: '/assets/wallets/walletconnect.svg',
    connector: connectors.walletconnect,
  },
  {
    name: 'Injected',
    logoPath: '/assets/wallets/eth.svg',
    connector: connectors.injected,
  },
];
const Authentication = () => {
  const { activate, deactivate, active, account, chainId, library } = useWeb3React();
  const [isConnecting, setIsConnecting] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    if (isConnecting === false) {
      return;
    }
    const handleAuth = async () => {
      const userData = { address: account, chain: chainId, network: 'evm' };
      const { message } = await apiPost('/auth/request-message', userData);

      const signature = await library.getSigner(account).signMessage(message);
      try {
        await signIn('credentials', { message, signature, redirect: false });
        setIsConnecting(false);
        // redirects to main page
        push('/');
      } catch (e) {
        return;
      }
    };

    handleAuth();
  }, [account, active, chainId, isConnecting, library, push]);

  const handleConnect = async (connector?: AbstractConnector) => {
    if (!connector) {
      alert('Setup it first in the Authentication.tsx');
      return;
    }

    if (active) {
      deactivate();
    }

    try {
      await activate(connector);
      setIsConnecting(true);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  return (
    <div className={styles.auth}>
      <h3 className={styles.title}>Web3 Authentication</h3>
      <div className={styles.options}>
        {wallets.map(({ name, logoPath, connector }) => (
          <Option
            disabled={Boolean(!connector)}
            key={name}
            logoPath={logoPath}
            name={name}
            onClick={() => handleConnect(connector)}
          />
        ))}
      </div>
    </div>
  );
};

export default Authentication;
