import { signInWithMoralis as signInWithMoralisByEvm } from '@moralisweb3/client-firebase-evm-auth';
import { signInWithMoralis as signInWithMoralisBySolana } from '@moralisweb3/client-firebase-sol-auth';
import { httpsCallable } from '@firebase/functions';
import { User } from '@firebase/auth';
import { Fragment, useState } from 'react';
import { auth, functions, moralisAuth } from './firebase';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Web3Provider } from '@ethersproject/providers';

export function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => auth.currentUser);

  async function signInWithMetamask() {
    const result = await signInWithMoralisByEvm(moralisAuth);

    setCurrentUser(result.credentials.user);
  }

  async function signInWithWalletConnect() {
    localStorage.removeItem('walletconnect');

    const provider = new WalletConnectProvider({
      rpc: {
        1: 'https://replace_me/',
      },
    });

    await provider.enable();

    const result = await signInWithMoralisByEvm(moralisAuth, {
      provider: new Web3Provider(provider),
    });

    setCurrentUser(result.credentials.user);
  }

  async function signInWithPhantom() {
    const result = await signInWithMoralisBySolana(moralisAuth);

    setCurrentUser(result.credentials.user);
  }

  async function signOut() {
    await auth.signOut();
    setCurrentUser(null);
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
          {currentUser ? (
            <Fragment>
              address: {currentUser.displayName}, uid: {currentUser.uid}
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
