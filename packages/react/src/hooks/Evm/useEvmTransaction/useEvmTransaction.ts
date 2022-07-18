import { EvmTransactionInput, EvmTransactionResponse, MoralisError } from '@moralisweb3/core';
import { IDefaultCallbacks } from '../../types';
import { useResolver } from '../../useResolver';
import { useState, useCallback } from 'react';
import Evm from '@moralisweb3/evm';

export const useEvmTransaction = () => {
  const resolver = useResolver();
  const [data, setData] = useState<EvmTransactionResponse | null>(null);
  const [error, setError] = useState<MoralisError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const send = useCallback(
    ({
      onComplete,
      onError,
      onSuccess,
      throwOnError = false,
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
          _onSuccess: setData,
          onComplete,
          onError,
          onSuccess,
          throwOnError,
        },
      );
    },
    [],
  );

  return { send, isLoading, error, data };
};
