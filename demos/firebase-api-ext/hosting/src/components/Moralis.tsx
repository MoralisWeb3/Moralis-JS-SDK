import { createContext, useContext, useEffect, useState } from 'react';
import { Moralis, initializeMoralis } from './MoralisInitializer';

const moralisContext = createContext<Moralis | null>(null);

export function useMoralis(): Moralis {
  const moralis = useContext(moralisContext);
  if (!moralis) {
    throw new Error('Cannot find Moralis context');
  }
  return moralis;
}

export interface MoralisInitializerProps {
  initializing: JSX.Element;
  initialized: JSX.Element;
}

export function MoralisInitializer(props: MoralisInitializerProps) {
  const [moralis, setMoralis] = useState<Moralis | null>(null);

  useEffect(() => {
    const handleSuccess = setMoralis;
    const handleError = alert;

    initializeMoralis().then(handleSuccess, handleError);
  }, []);

  return (
    <moralisContext.Provider value={moralis}>
      {moralis ? props.initialized : props.initializing}
    </moralisContext.Provider>
  );
}
