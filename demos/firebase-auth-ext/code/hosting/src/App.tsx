import { SignInContext, requestMessage, signInWithMoralis } from '@moralisweb3/client-firebase-auth';
import { auth, functions, moralisAuth } from './firebase';
import { httpsCallable } from '@firebase/functions';
import { User } from '@firebase/auth';
import { Fragment, useState } from 'react';
import { connectToMetamask, connectToPhantom } from './connectors';
import { encode } from 'bs58';

export function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => auth.currentUser);

  async function signInWithMetamask() {
    const { signer, chain, address } = await connectToMetamask();

    const context = await requestMessage(moralisAuth, { networkType: 'evm', address, chain });

    const signature = await signer.signMessage(context.message);

    signIn(context, signature);
  }

  async function signInWithPhantom() {
    const { signer, address } = await connectToPhantom();

    const context = await requestMessage(moralisAuth, { networkType: 'solana', address, network: 'mainnet' });

    const encodedMessage = new TextEncoder().encode(context.message);

    const signature = await signer.signMessage(encodedMessage);

    signIn(context, encode(signature.signature));
  }

  async function signIn(context: SignInContext, signature: string) {
    const credentials = await signInWithMoralis(moralisAuth, { context, signature });
    // eslint-disable-next-line no-console
    console.log(credentials);
    setCurrentUser(credentials.user);
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

      <button onClick={signInWithPhantom}>Sign in with Phantom</button>

      <button onClick={signOut}>Sign out</button>

      <h4>Test</h4>

      <button onClick={getSecretData}>Get secret data</button>
    </div>
  );
}
