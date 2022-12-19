import { signInWithMoralis } from '@moralisweb3/client-firebase-evm-auth';
import Head from 'next/head';
import { useState } from 'react';
import { useFirebase } from '../components/FirebaseInitializer';

export default function Home() {
  const { auth, moralisAuth } = useFirebase();
  const [currentUser, setCurrentUser] = useState<string | null | undefined>(() => auth.currentUser?.displayName);

  async function signInByMetaMask() {
    await signInWithMoralis(moralisAuth);
    setCurrentUser(auth.currentUser?.displayName);
  }

  async function signOut() {
    await auth.signOut();
    setCurrentUser(null);
  }

  return (
    <>
      <Head>
        <title>Firebase NextJs Demo</title>
      </Head>

      <p>User: {currentUser || '-'}</p>
      <p>
        <button onClick={signInByMetaMask}>Sign in by MetaMask</button> <button onClick={signOut}>Sign out</button>
      </p>
    </>
  );
}
