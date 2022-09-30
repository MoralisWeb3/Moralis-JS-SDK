import { initializeApp } from '@firebase/app';
import { getAuth, browserSessionPersistence } from '@firebase/auth';
import { connectFunctionsEmulator, getFunctions } from '@firebase/functions';
import { getMoralisAuth } from '@moralisweb3/client-firebase-auth-utils';

export const app = initializeApp({
  apiKey: String(process.env.REACT_APP_FIREBASE_API_KEY),
  authDomain: String(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN),
  projectId: String(process.env.REACT_APP_FIREBASE_PROJECT_ID),
  storageBucket: String(process.env.REACT_APP_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID),
  appId: String(process.env.REACT_APP_FIREBASE_APP_ID),
});

export const auth = getAuth(app);

export const functions = getFunctions(app);

export const moralisAuth = getMoralisAuth(app);

export async function initFirebase() {
  // eslint-disable-next-line no-undef
  if (window.location.hostname === 'localhost') {
    connectFunctionsEmulator(functions, 'localhost', 5001);
  }

  await auth.setPersistence(browserSessionPersistence);
}
