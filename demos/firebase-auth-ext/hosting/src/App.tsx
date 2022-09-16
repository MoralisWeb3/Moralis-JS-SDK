import { Web3Provider } from '@ethersproject/providers';
import { requestMessage, signInWithMoralis } from '@moralisweb3/client-firebase-auth';
import { auth, functions, moralisAuth } from './firebase';
import { httpsCallable } from '@firebase/functions';
import { User } from '@firebase/auth';
import { Fragment, useState } from 'react';

export function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => auth.currentUser);

  async function connectToMetamask() {
    // eslint-disable-next-line no-undef, @typescript-eslint/no-explicit-any
    const provider = new Web3Provider((window as any)['ethereum'], 'any');

    const [accounts, chainId] = await Promise.all([
      provider.send('eth_requestAccounts', []),
      provider.send('eth_chainId', []),
    ]);

    const signer = provider.getSigner();
    return { signer, chain: chainId, address: accounts[0] };
  }

  async function authenticate() {
    const { signer, chain, address } = await connectToMetamask();

    const message = await requestMessage(moralisAuth, { address, chain });

    const signature = await signer.signMessage(message.message);

    const user = await signInWithMoralis(moralisAuth, { message: message.message, signature });
    // eslint-disable-next-line no-console
    console.log(user);
    setCurrentUser(user.user);
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

      <button onClick={authenticate}>Connect wallet</button>

      <button onClick={signOut}>Sign out</button>

      <button onClick={getSecretData}>Get secret data</button>
    </div>
  );
}
