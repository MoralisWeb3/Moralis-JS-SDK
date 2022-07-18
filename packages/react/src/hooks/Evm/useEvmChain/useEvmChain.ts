import { IUseEvmChain } from './types';
import { MoralisError } from '@moralisweb3/core';
import { useMoralisEvm } from '../useMoralisEvm';
import { useResolver } from '../../useResolver';
import { useState, useCallback } from 'react';
import MetamaskConnector from '@moralisweb3/evm-metamask-connector';

export const useEvmChain = () => {
  const resolver = useResolver();
  const { chain } = useMoralisEvm();
  const [isChainPending, setIsChainPending] = useState(false);
  const [isChainAdding, setIsChainAdding] = useState(false);
  const [error, setError] = useState<MoralisError | null>(null);

  const addChainToWallet = useCallback<IUseEvmChain>(
    (providedChain, { onComplete, onError, onSuccess, throwOnError = false } = {}) => {
      return resolver(
        () => {
          setIsChainAdding(true);
          return MetamaskConnector.addNetwork(providedChain);
        },
        {
          _onComplete: () => setIsChainAdding(false),
          _onError: setError,
          onComplete,
          onError,
          onSuccess,
          throwOnError,
        },
      );
    },
    [],
  );

  const switchChain = useCallback<IUseEvmChain<{ resolveUnrecognized?: boolean }>>(
    (providedChain, { onComplete, onError, onSuccess, throwOnError = false, resolveUnrecognized = true } = {}) => {
      return resolver(
        async () => {
          setIsChainPending(true);
          return await MetamaskConnector.switchNetwork(providedChain);
        },
        {
          _onComplete: () => setIsChainPending(false),
          _onError: (error) => {
            setError(error);
            if (resolveUnrecognized && (error as unknown as { code?: number })?.code === 4902) {
              return addChainToWallet(providedChain, { onComplete, onError, onSuccess, throwOnError });
            }
          },
          onComplete,
          onError,
          onSuccess,
          throwOnError,
        },
      );
    },
    [],
  );
  return { switchChain, addChainToWallet, isChainPending, isChainAdding, chain, error };
};
