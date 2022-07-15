import { useMoralisEvm } from '../useMoralisEvm';

export const useEvmAccount = () => {
  const { isConnecting, isConnected, isDisconnecting, connect, disconnect, account } = useMoralisEvm();

  return { isConnecting, isConnected, isDisconnecting, connect, disconnect, account };
};
