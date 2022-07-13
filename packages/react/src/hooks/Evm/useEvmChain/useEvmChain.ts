import { useState, useCallback } from 'react';
import { useResolver } from '../../useResolver';
import { IAddChainParams, ISwitchChainParams } from './types';
import MetamaskConnector from '@moralisweb3/evm-metamask-connector';
import { useMoralisEvm } from '../useMoralisEvm';

export const useEvmChain = () => {
  const resolver = useResolver();
  const { chain } = useMoralisEvm();

  const [isChainPending, setIsChainPending] = useState(false);
  const [isChainAdding, setIsChainAdding] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const switchChain = useCallback<ISwitchChainParams>(
    (providedChain, { onComplete, onError, onSuccess, throwOnError = false } = {}) => {
      resolver(
        async () => {
          setIsChainPending(true);
          return await MetamaskConnector.switchNetwork(providedChain);
        },
        {
          _onComplete: () => setIsChainPending(false),
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

  const addChainToWallet = useCallback<IAddChainParams>(
    (providedChain, { onComplete, onError, onSuccess, throwOnError = true } = {}) => {
      resolver(
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
  return { switchChain, addChainToWallet, isChainPending, isChainAdding, chain, error };
};
