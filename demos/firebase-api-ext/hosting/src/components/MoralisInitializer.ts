import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, browserSessionPersistence, getAuth } from 'firebase/auth';
import { connectFunctionsEmulator, Functions, getFunctions } from 'firebase/functions';
import { getMoralisEvmApi } from '@moralisweb3/client-firebase-evm-api';
import { getMoralis } from '@moralisweb3/client-firebase-utils';
import { EvmApiClient } from '@moralisweb3/client-evm-api';
import { getMoralisSolApi } from '@moralisweb3/client-firebase-sol-api';
import { SolApiClient } from '@moralisweb3/client-sol-api';

export interface Moralis {
  app: FirebaseApp;
  auth: Auth;
  functions: Functions;
  evmApi: EvmApiClient;
  solApi: SolApiClient;
}

export async function initializeMoralis(): Promise<Moralis> {
  const app = initializeApp({
    apiKey: String(process.env.REACT_APP_FIREBASE_API_KEY),
    authDomain: String(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN),
    projectId: String(process.env.REACT_APP_FIREBASE_PROJECT_ID),
    storageBucket: String(process.env.REACT_APP_FIREBASE_STORAGE_BUCKET),
    messagingSenderId: String(process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID),
    appId: String(process.env.REACT_APP_FIREBASE_APP_ID),
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

  const evmApi = getMoralisEvmApi(moralis);
  const solApi = getMoralisSolApi(moralis);

  return { app, auth, functions, evmApi, solApi };
}

function isLocalhost(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1';
}
