import { IAddChainParams, ISwitchChainParams } from './types';
import { useMoralisEvm } from '../useMoralisEvm';
import { useResolver } from '../../useResolver';
import { useState, useCallback } from 'react';
import MetamaskConnector from '@moralisweb3/evm-metamask-connector';

export const useEvmChain = () => {
  const resolver = useResolver();
  const { chain } = useMoralisEvm();

  const [isChainPending, setIsChainPending] = useState(false);
  const [isChainAdding, setIsChainAdding] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const switchChain = useCallback<ISwitchChainParams>(
    (providedChain, { onComplete, onError, onSuccess, throwOnError = false, resolveUnrecognized = true } = {}) => {
      resolver(
        async () => {
          setIsChainPending(true);
          return await MetamaskConnector.switchNetwork(providedChain);
        },
        {
          _onComplete: () => setIsChainPending(false),
          _onError: (error) => {
            setError(error);
            if (resolveUnrecognized) {
              // eslint-disable-next-line no-console
              console.log('error.code: ', error.code);
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
