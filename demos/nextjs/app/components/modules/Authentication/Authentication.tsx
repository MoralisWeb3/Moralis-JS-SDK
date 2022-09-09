import { Connector, useAccount, useConnect, useDisconnect, useNetwork, useSignMessage } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { Option } from '../../elements';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import styles from './Authentication.module.css';
import { useAuthMessage, useEvmWalletTokenBalances } from '@moralisweb3/next';
import { useEffect } from 'react';
import Moralis from 'moralis';

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
  },
  {
    name: 'WalletConnect',
    logoPath: '/assets/wallets/walletconnect.svg',
    connector: new WalletConnectConnector({
      options: { rpc: ['https://mainnet.infura.io/v3/84842078b09946638c03157f83405213'] },
    }),
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
  const { chain } = useNetwork();
  const { getMessage } = useAuthMessage();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();
  const { data: block } = useEvmWalletTokenBalances({
    address: '0x259DB2fD041d370e803f4D44951bE0E4722b7a45',
  });

  useEffect(() => {
    const xxx = async () => {
      await Moralis.start({ apiKey: 'IcG2VVd5xU8sse7OOaKlwdtqrxER1uHCxwlXwO0nalTjMjeAEdNY2TNdCx2RkNvn' });
      const m = await Moralis.Auth.requestMessage({
        network: 'evm',
        domain: window.location.host,
        chain: '0x1',
        address: '0x259DB2fD041d370e803f4D44951bE0E4722b7a45',
        uri: window.location.origin,
        timeout: 0,
      });
      console.log(m);
    };
    xxx();
  }, []);

  console.log(JSON.stringify(block, null, 2));

  const handleAuth = async (connector?: Connector, disabled?: boolean) => {
    if (disabled) {
      // eslint-disable-next-line no-alert
      alert('Setup it first in the Authentication.tsx');
      return;
    }

    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({ connector });

    const message = await getMessage({
      network: 'evm',
      domain: window.location.host,
      chain: chain.id,
      address: account,
      uri: window.location.origin,
      timeout: 0,
    });

    if (message?.message) {
      const signature = await signMessageAsync({ message: message.message });

      signIn('credentials', { message, signature, redirect: false }).then(() =>
        // redirects to main page
        push('/'),
      );
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
