import { useContext } from 'react';
import { MoralisContext } from '../../context/MoralisProvider';

export function useMoralisContext() {
  const context = useContext(MoralisContext);
  if (!context) {
    throw new Error(`Please wrap your application with MoralisProvider`);
  }
  return context;
}
