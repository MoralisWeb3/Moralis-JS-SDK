import { Option } from '../../elements';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import apiPost from '../../../utils/apiPost';
import styles from './Authentication.module.css';
import { useEthers } from '@usedapp/core';

const wallets = [
  {
    name: 'Metamask',
    logoPath: '/assets/wallets/metamask.svg',
  },
  {
    name: 'Coinbase Wallet',
    logoPath: '/assets/wallets/coinbase.svg',
    disabled: true,
  },
  {
    name: 'WalletConnect',
    logoPath: '/assets/wallets/walletconnect.svg',
  },
  {
    name: 'Injected',
    logoPath: '/assets/wallets/eth.svg',
  },
];
const Authentication = () => {
  const { account, activateBrowserWallet, chainId, library } = useEthers();
  const [isConnecting, setIsConnecting] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    if (isConnecting === false || !account || !chainId) {
      return;
    }

    const handleAuth = async () => {
      const userData = { address: account, chain: chainId, network: 'evm' };
      const { message } = await apiPost('/auth/request-message', userData);

      const signature = await library?.getSigner(account).signMessage(message);
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
  }, [account, chainId, isConnecting, library, push]);

  const handleConnect = async (disabled?: boolean) => {
    if (disabled) {
      alert('Setup it first in the Authentication.tsx');
      return;
    }

    try {
      if (!account) {
        activateBrowserWallet();
      }

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
        {wallets.map(({ name, logoPath, disabled }) => (
          <Option
            disabled={disabled}
            key={name}
            logoPath={logoPath}
            name={name}
            onClick={() => handleConnect(disabled)}
          />
        ))}
      </div>
    </div>
  );
};

export default Authentication;
