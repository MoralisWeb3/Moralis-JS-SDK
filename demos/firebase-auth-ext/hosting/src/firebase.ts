import { initializeApp } from 'firebase/app';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { getMoralisEvmAuth } from '@moralisweb3/client-firebase-evm-auth';
import { getMoralisSolAuth } from '@moralisweb3/client-firebase-sol-auth';
import { getMoralis } from '@moralisweb3/client-firebase-utils';
import { WalletConnectEvmConnector } from '@moralisweb3/client-connector-wallet-connect';

export const app = initializeApp({
  apiKey: String(process.env.REACT_APP_FIREBASE_API_KEY),
  authDomain: String(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN),
  projectId: String(process.env.REACT_APP_FIREBASE_PROJECT_ID),
  storageBucket: String(process.env.REACT_APP_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID),
  appId: String(process.env.REACT_APP_FIREBASE_APP_ID),
});

export const functions = getFunctions(app);

export const moralis = getMoralis(app, {
  defaultBackendAdapter: {
    auth: {
      functions,
    },
  },
});

export const evmAuth = getMoralisEvmAuth(moralis, {
  connectors: [
    WalletConnectEvmConnector.create({
      rpc: {
        1: 'https://replace_me/',
      },
    }),
  ],
});

export const solAuth = getMoralisSolAuth(moralis);

export async function initFirebase() {
  // eslint-disable-next-line no-undef
  if (window.location.hostname === 'localhost') {
    connectFunctionsEmulator(functions, 'localhost', 5001);
  }
}
