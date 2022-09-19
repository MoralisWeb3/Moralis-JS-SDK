import {
  Challenge,
  requestEvmChallenge,
  requestSolanaChallenge,
  signInWithMoralis,
} from '@moralisweb3/client-firebase-auth';
import { auth, functions, moralisAuth } from './firebase';
import { httpsCallable } from '@firebase/functions';
import { User } from '@firebase/auth';
import { Fragment, useState } from 'react';
import { connectToMetamask, connectToPhantom } from './connectors';
import { encode } from 'bs58';

export function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => auth.currentUser);

  async function authenticateEvm() {
    const { signer, chain, address } = await connectToMetamask();

    const challenge = await requestEvmChallenge(moralisAuth, { address, chain });

    const signature = await signer.signMessage(challenge.message);

    signIn(challenge, signature);
  }

  async function authenticateSolana() {
    const { signer, address } = await connectToPhantom();

    const challenge = await requestSolanaChallenge(moralisAuth, { address, network: 'mainnet' });

    const encodedMessage = new TextEncoder().encode(challenge.message);

    const signature = await signer.signMessage(encodedMessage);

    signIn(challenge, encode(signature.signature));
  }

  async function signIn(challenge: Challenge, signature: string) {
    const credentials = await signInWithMoralis(moralisAuth, { challenge, signature });
    // eslint-disable-next-line no-console
    console.log(credentials);
    setCurrentUser(credentials.user);
  }

  async function signOut() {
    await auth.signOut();
    setCurrentUser(null);
  }

  async function getSecretData() {
    const response = await httpsCallable(functions, 'getSecretData')({});
    // eslint-disable-next-line no-alert, no-undef
    alert(JSON.stringify(response));
  }

  return (
    <div className="App">
      <h1>Authenticate with Moralis Web3</h1>

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

      <button onClick={authenticateEvm}>Connect to MetaMask</button>

      <button onClick={authenticateSolana}>Connect to Phantom</button>

      <button onClick={signOut}>Sign out</button>

      <button onClick={getSecretData}>Get secret data</button>
    </div>
  );
}
