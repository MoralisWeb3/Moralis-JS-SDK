import { ConfigValues } from '@moralisweb3/core';
import { IDefaultCallbacks } from 'hooks/types';
import { useEffect, useState, useCallback } from 'react';
import { useResolver } from 'hooks/useResolver';
import Core from '@moralisweb3/core';

export interface IUseMoralisCore extends Partial<ConfigValues> {
  startOnMount?: boolean;
}

export const _useMoralisCore = ({ startOnMount = true, ...startConfig }: IUseMoralisCore) => {
  const resolver = useResolver();
  const [isStarted, setIsStarted] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const start = useCallback(
    ({ onComplete, onError, onSuccess, throwOnError = true }: IDefaultCallbacks<void> = {}) => {
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
