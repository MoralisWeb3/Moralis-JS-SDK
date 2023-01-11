import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, browserSessionPersistence, getAuth } from 'firebase/auth';
import { connectFunctionsEmulator, Functions, getFunctions } from 'firebase/functions';
import { getMoralisEvmAuth } from '@moralisweb3/client-firebase-evm-auth';
import { getMoralis } from '@moralisweb3/client-firebase-utils';
import { EvmAuthClient } from '@moralisweb3/client-evm-auth';

export interface Moralis {
  app: FirebaseApp;
  auth: Auth;
  functions: Functions;
  evmAuth: EvmAuthClient;
}

export async function initializeMoralis(): Promise<Moralis> {
  const app = initializeApp({
    apiKey: String(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
    authDomain: String(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
    projectId: String(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
    storageBucket: String(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
    messagingSenderId: String(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
    appId: String(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
  });

  const auth = getAuth(app);
  await auth.setPersistence(browserSessionPersistence);

  const functions = getFunctions(app);
  const { hostname } = window.location;
  if (isLocalhost(hostname)) {
    connectFunctionsEmulator(functions, hostname, 5001);
  }

  const moralis = getMoralis(app, {
    defaultBackendAdapter: {
      auth: {
        auth,
        functions,
      },
      api: {
        functions,
      },
    },
  });

  const evmAuth = getMoralisEvmAuth(moralis);

  return { app, auth, functions, evmAuth };
}

function isLocalhost(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1';
}
