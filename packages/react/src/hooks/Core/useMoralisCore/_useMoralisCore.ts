import { useEffect, useState, useCallback } from 'react';
import { ConfigValues } from '@moralisweb3/core';
import Core from '@moralisweb3/core';
import { useResolver } from 'hooks/useResolver';
import { ICoreStart } from './types';

export interface IUseMoralisCore extends Partial<ConfigValues> {
  startOnMount?: boolean;
}

export const _useMoralisCore = ({ startOnMount = true, ...startConfig }: IUseMoralisCore) => {
  const resolver = useResolver();
  const [isStarted, setIsStarted] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const start = useCallback(
    ({ onComplete, onError, onSuccess, throwOnError = true }: ICoreStart = {}) => {
      return resolver(
        () => {
          setIsStarting(true);
          return Core.start(startConfig);
        },
        {
          _onComplete: () => setIsStarting(false),
          _onSuccess: () => setIsStarted(true),
          onComplete,
          onError,
          onSuccess,
          throwOnError,
        },
      );
    },
    [startConfig],
  );

  useEffect(() => {
    if (isStarted || isStarting) {
      return;
    }
    if (!startOnMount) {
      return;
    }
    start();
  }, [startOnMount, startConfig]);

  return { isStarted, isStarting, start };
};
