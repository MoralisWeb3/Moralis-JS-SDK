// import { ISignParams } from './types';
import { MoralisError } from '@moralisweb3/core';
import { useResolver } from '../../useResolver';
import { useState } from 'react';
import Evm from '@moralisweb3/evm';
import { IDefaultCallbacks } from '../../../hooks/types';

export const useEvmSignMessage = () => {
  const resolver = useResolver();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<null | string>(null);
  const [error, setError] = useState<undefined | MoralisError>(undefined);

  const sign = (message: string, defaultCallbacks: IDefaultCallbacks<string>) => {
    return resolver(
      () => {
        setIsLoading(true);
        return Evm.signMessage(message);
      },
      {
        _onComplete: () => setIsLoading(false),
        _onError: (error) => setError(error),
        _onSuccess: (data) => setData(data),
        ...defaultCallbacks,
        // throwOnError,
      },
    );
  };
  // sign('m,esss', { on });
  return { sign, isLoading, data, error };
};
