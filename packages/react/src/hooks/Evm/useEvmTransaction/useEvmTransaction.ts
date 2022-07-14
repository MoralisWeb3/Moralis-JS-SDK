import { useState, useCallback } from 'react';
import { useResolver } from '../../useResolver';
import { EvmTransactionInput, EvmTransactionResponse, MoralisError } from '@moralisweb3/core';

import Evm from '@moralisweb3/evm';
import { IDefaultCallbacks } from 'hooks/types';

export const useEvmTransaction = () => {
  const resolver = useResolver();
  const [isLoading, setIsLoading] = useState(false);
  // const [data, setData] = useState<null | string>(null);
  const [error, setError] = useState<MoralisError | undefined>(undefined);

  const send = useCallback(
    ({
      onComplete,
      onError,
      onSuccess,
      throwOnError = true,
      chain,
      ...data
    }: IDefaultCallbacks<EvmTransactionResponse> & EvmTransactionInput) => {
      return resolver(
        async () => {
          setIsLoading(true);
          return await Evm.sendTransaction({
            chain,
            ...data,
          });
        },
        {
          _onComplete: () => setIsLoading(false),
          _onError: setError,
          // _onSuccess: () => setIsConnected(true),
          onComplete,
          onError,
          onSuccess,
          throwOnError,
        },
      );
    },
    [],
  );

  return { send, isLoading, error };
};
