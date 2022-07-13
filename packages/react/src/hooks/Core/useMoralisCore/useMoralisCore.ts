import { CoreContext } from 'context/Core/CoreContext';
import { useContext } from 'react';

export const useMoralisCore = () => {
  const moralisCoreContext = useContext(CoreContext);

  if (!moralisCoreContext) {
    throw new Error('Make sure to only call useMoralisCore within a  <MoralisProvider>');
  }

  return moralisCoreContext;
};
