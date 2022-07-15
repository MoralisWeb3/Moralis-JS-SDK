import { useContext } from 'react';
import { MoralisContext } from '../../../context/MoralisContext';

export const useMoralisEvm = () => {
  const moralisContext = useContext(MoralisContext);

  if (!moralisContext) {
    throw new Error('Make sure to only call useMoralisEvm within a  <MoralisProvider>');
  }

  const { isConnecting, isConnected, isDisconnecting, chain, connect, disconnect, account, connector, provider, Evm } =
    moralisContext;

  return { isConnecting, isConnected, isDisconnecting, chain, connect, disconnect, account, connector, provider, Evm };
};
