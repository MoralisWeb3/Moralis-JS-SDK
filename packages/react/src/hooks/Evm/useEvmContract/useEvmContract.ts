import { TExecuteParams, IUseEvmContract } from './types';
import { MoralisError } from '@moralisweb3/core';
import { useResolver } from '../../useResolver';
import { useState, useCallback } from 'react';
import Evm from '@moralisweb3/evm';

export const useEvmContract = ({ contractAddress, abi }: IUseEvmContract) => {
  const resolver = useResolver();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<unknown | null>(null);
  const [error, setError] = useState<MoralisError | undefined>(undefined);

  const execute = useCallback(
    ({ onComplete, onError, onSuccess, throwOnError = true, ...executeParams }: TExecuteParams) => {
      return resolver(
        () => {
          setIsLoading(true);
          return Evm.executeFunction({ contractAddress, abi, ...executeParams });
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

  return { execute, isLoading, data, error };
};
