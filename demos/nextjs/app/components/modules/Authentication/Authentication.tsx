import { Connector, useAccount, useConnect, useDisconnect, useNetwork, useSignMessage } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { Option } from '../../elements';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import styles from './Authentication.module.css';
import { useAuthRequestChallengeEvm } from '@moralisweb3/next';
import { useEffect } from 'react';

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
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();

  const { challenge, requestChallengeAsync } = useAuthRequestChallengeEvm();

  useEffect(() => console.log('challenge: ', challenge), [challenge]);
  // useEffect(() => {
  //   if (!isConnected) {
  //     return;
  //   }
  //   refetch();
  // }, [isConnected]);

  // useEffect(() => {
  //   if (!challenge) {
  //     return;
  //   }
  //   async function signMessage(message: string) {
  //     const signature = await signMessageAsync({ message });
  //     signIn('credentials', { message, signature, redirect: false });
  //   }

  //   signMessage(challenge.message);
  // }, [challenge]);

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

    const challengeParams = {
      address: account,
      chainId: chain.id,
      domain: 'amazing.dapp',
      uri: 'http://localhost:3000',
      timeout: 120,
    };

    const xxx = await requestChallengeAsync(challengeParams);

    console.log('challenge2: ', xxx);

    // const signature = await signMessageAsync({ message: challenge?.message });

    // try {
    //   await signIn('credentials', { message, signature, redirect: false });
    //   // redirects to main page
    //   push('/');
    // } catch (e) {
    //   // Do nothing
    // }
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
