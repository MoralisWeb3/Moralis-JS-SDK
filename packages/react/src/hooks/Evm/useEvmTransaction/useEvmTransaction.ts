import { useState, useCallback } from 'react';
import { useResolver } from '../../useResolver';
import { IAction } from './types';
import Evm from '@moralisweb3/evm';

export const useEvmTransaction = () => {
  const resolver = useResolver();
  const [isLoading, setIsLoading] = useState(false);

  const send = useCallback(({ onComplete, onError, onSuccess, throwOnError = true, chain, ...data }: IAction) => {
    return resolver(
      () => {
        setIsLoading(true);
        alert('Not implemented');
        return Evm.sendTransaction({
          chain: '0x1',
        });
      },
      {
        _onComplete: () => setIsLoading(false),
        // _onError,
        // _onSuccess: () => setIsConnected(true),
        onComplete,
        onError,
        onSuccess,
        throwOnError,
      },
    );
  }, []);

  return { send, isLoading };
};
