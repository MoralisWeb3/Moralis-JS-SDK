import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, browserSessionPersistence, getAuth } from 'firebase/auth';
import { connectFunctionsEmulator, Functions, getFunctions } from 'firebase/functions';
import { getMoralisAuth, MoralisAuth } from '@moralisweb3/client-firebase-auth-utils';

export interface Firebase {
  app: FirebaseApp;
  auth: Auth;
  functions: Functions;
  moralisAuth: MoralisAuth;
}

export async function initializeFirebase(): Promise<Firebase> {
  const app = initializeApp({
    apiKey: String(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
    authDomain: String(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
    projectId: String(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
    storageBucket: String(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
    messagingSenderId: String(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
    appId: String(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
  });

  const auth = getAuth();
  await auth.setPersistence(browserSessionPersistence);

  const functions = getFunctions();
  if (window.location.hostname === 'localhost') {
    connectFunctionsEmulator(functions, 'localhost', 5001);
  }

  const moralisAuth = getMoralisAuth(app, {
    auth,
    functions,
  });

  return { app, auth, functions, moralisAuth };
}
