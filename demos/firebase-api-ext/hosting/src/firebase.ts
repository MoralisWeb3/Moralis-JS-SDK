import { initializeApp } from '@firebase/app';
import { connectFunctionsEmulator, getFunctions } from '@firebase/functions';
import { getMoralisSolApi } from '@moralisweb3/client-firebase-sol-api';
import { getMoralisEvmApi } from '@moralisweb3/client-firebase-evm-api';

export const app = initializeApp({
  apiKey: String(process.env.REACT_APP_FIREBASE_API_KEY),
  authDomain: String(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN),
  projectId: String(process.env.REACT_APP_FIREBASE_PROJECT_ID),
  storageBucket: String(process.env.REACT_APP_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID),
  appId: String(process.env.REACT_APP_FIREBASE_APP_ID),
});

export const functions = getFunctions(app);

export const solApi = getMoralisSolApi(app);

export const evmApi = getMoralisEvmApi(app);

export async function initFirebase() {
  // eslint-disable-next-line no-undef
  if (window.location.hostname === 'localhost') {
    connectFunctionsEmulator(functions, 'localhost', 5001);
  }
}
