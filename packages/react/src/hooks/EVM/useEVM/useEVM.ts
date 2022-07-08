import Moralis from 'moralis';
import { useCallback, useState } from 'react';
import { IEVMConnect } from './types';

export const useEVM = () => {
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = useCallback(async ({ throwOnError, onComplete, onError, onSuccess }: IEVMConnect = {}) => {
    try {
      setIsConnecting(true);

      const currentWeb3 = await Moralis.Evm.connect('metamask');

      if (onSuccess) {
        onSuccess(currentWeb3);
      }
    } catch (error) {
      if (throwOnError) {
        throw error;
      }
      if (onError) {
        onError(error);
      }
    } finally {
      setIsConnecting(false);
      if (onComplete) {
        onComplete();
      }
    }
  }, []);

  return { isConnecting, connect };
};
