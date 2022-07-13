import { IExecuteOptions, IUseEvmContract } from './types';
import { useResolver } from '../../useResolver';
import { useState, useCallback } from 'react';
import Evm from '@moralisweb3/evm';

export const useEvmContract = ({ address, abi }: IUseEvmContract) => {
  const resolver = useResolver();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<unknown | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    ({ onComplete, onError, onSuccess, throwOnError = true, ...executeParams }: IExecuteOptions) => {
      return resolver(
        () => {
          setIsLoading(true);
          return Evm.executeFunction({ contractAddress: address, abi, ...executeParams });
        },
        {
          _onComplete: () => setIsLoading(false),
          _onError: (error: Error) => setError(error),
          _onSuccess: (executeData: unknown) => setData(executeData),
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
