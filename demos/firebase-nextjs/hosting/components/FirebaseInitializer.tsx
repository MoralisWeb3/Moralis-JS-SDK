import { createContext, useContext, useEffect, useState } from 'react';
import { Firebase, initializeFirebase } from './Firebase';

const firebaseContext = createContext<Firebase | null>(null);

export function useFirebase(): Firebase {
  const firebase = useContext(firebaseContext);
  if (!firebase) {
    throw new Error('Cannot find Firebase context');
  }
  return firebase;
}

export interface FirebaseInitializerProps {
  initializing: () => JSX.Element;
  initialized: () => JSX.Element;
}

export function FirebaseInitializer(props: FirebaseInitializerProps) {
  const [firebase, setFirebase] = useState<Firebase | null>(null);

  useEffect(() => {
    const handleSuccess = setFirebase;
    const handleError = alert;

    initializeFirebase().then(handleSuccess, handleError);
  }, []);

  return (
    <firebaseContext.Provider value={firebase}>
      {firebase ? props.initialized() : props.initializing()}
    </firebaseContext.Provider>
  );
}
