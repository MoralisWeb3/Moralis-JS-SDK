import { signInWithMoralis as signInWithMoralisByEvm } from '@moralisweb3/client-firebase-evm-auth';
import { signInWithMoralis as signInWithMoralisBySolana } from '@moralisweb3/client-firebase-sol-auth';
import { httpsCallable } from '@firebase/functions';
import { Fragment, useEffect, useState } from 'react';
import { evmAuth, functions, solAuth } from './firebase';
import { User } from '@moralisweb3/client-backend-adapter-utils';

export function App() {
  const [credentials, setCredentials] = useState<User | null>(() => null);

  useEffect(() => {
    async function restoreCredentials() {
      const result = await Promise.all([evmAuth.tryGetUser(), solAuth.tryGetUser()]);
      setCredentials(result[0] || result[1]);
    }

    restoreCredentials();
  }, []);

  async function signInWithMetamask() {
    const result = await signInWithMoralisByEvm(evmAuth, 'default');

    setCredentials(result.user);
  }

  async function signInWithWalletConnect() {
    localStorage.removeItem('walletconnect');

    const result = await signInWithMoralisByEvm(evmAuth, 'walletconnect');

    setCredentials(result.user);
  }

  async function signInWithPhantom() {
    const result = await signInWithMoralisBySolana(solAuth);

    setCredentials(result.user);
  }

  async function signOut() {
    switch (credentials?.networkType) {
      case 'evm':
        await evmAuth.logOut();
        break;
      case 'solana':
        await solAuth.logOut();
        break;
    }
    setCredentials(null);
  }

  async function getSecretData() {
    try {
      const response = await httpsCallable(functions, 'getSecretData')({});
      // eslint-disable-next-line no-alert, no-undef
      alert(JSON.stringify(response));
    } catch (e) {
      // eslint-disable-next-line no-alert, no-undef
      alert((e as Error).message);
    }
  }

  return (
    <div className="App">
      <h1>🔒 Authenticate with Moralis Web3</h1>

      <p>
        Current user:&nbsp;
        <strong>
          {credentials ? (
            <Fragment>
              address: {credentials.address}, profileId: {credentials.profileId}, networkType: {credentials.networkType}
            </Fragment>
          ) : (
            'unknown'
          )}
        </strong>
      </p>

      <h4>Authentication</h4>

      <button onClick={signInWithMetamask}>Sign in with MetaMask</button>

      <button onClick={signInWithWalletConnect}>Sign in with WalletConnect</button>

      <button onClick={signInWithPhantom}>Sign in with Phantom</button>

      <button onClick={signOut}>Sign out</button>

      <h4>Test</h4>

      <button onClick={getSecretData}>Get secret data</button>
    </div>
  );
}
