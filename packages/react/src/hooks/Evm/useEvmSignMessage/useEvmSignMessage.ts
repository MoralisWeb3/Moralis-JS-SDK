import { useState, useCallback } from 'react';
import { useResolver } from '../../useResolver';
import { ISignParams } from './types';
import Evm from '@moralisweb3/evm';

export const useEvmSignMessage = () => {
  const resolver = useResolver();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<null | string>(null);
  const [error, setError] = useState<null | Error>(null);

  const sign = useCallback<ISignParams>((message, { onComplete, onError, onSuccess, throwOnError = true }) => {
    return resolver(
      () => {
        setIsLoading(true);
        return Evm.signMessage(message);
      },
      {
        _onComplete: () => setIsLoading(false),
        _onError: (error) => setError(error),
        _onSuccess: (data: string) => setData(data),
        onComplete,
        onError,
        onSuccess,
        throwOnError,
      },
    );
  }, []);

  return { sign, isLoading, data, error };
};
