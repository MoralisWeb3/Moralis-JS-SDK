import Moralis from 'moralis';
import React, { FC, createContext, useContext, useMemo } from 'react';
import { FetchConfig, MoralisConfig, MoralisContextValue, MoralisProviderProps } from './types';

export const MoralisContext = createContext<MoralisContextValue | null>(null);

export const _useMoralisContext = () => {
  const context = useContext(MoralisContext);
  if (!context) {
    throw new Error(`Please wrap your application with MoralisProvider`);
  }
  return context;
};

export const createMoralisConfig = (config: MoralisConfig) => config;

const MoralisProvider: FC<MoralisProviderProps> = ({ children, config }) => {
  const {
    revalidateOnMount,
    revalidateIfStale,
    revalidateOnFocus = false,
    revalidateOnReconnect,
    refreshInterval,
    refreshWhenHidden,
    refreshWhenOffline,
    shouldRetryOnError,
    dedupingInterval,
    focusThrottleInterval,
    loadingTimeout,
    errorRetryInterval,
    errorRetryCount,
    onDiscarded = () => undefined,
    onError = () => undefined,
    onErrorRetry = () => undefined,
    onSuccess = () => undefined,
    ...moralisConfig
  } = config;

  const fetchConfig: FetchConfig = {
    revalidateOnFocus,
    revalidateOnMount,
    revalidateIfStale,
    revalidateOnReconnect,
    refreshInterval,
    refreshWhenHidden,
    refreshWhenOffline,
    shouldRetryOnError,
    dedupingInterval,
    focusThrottleInterval,
    loadingTimeout,
    errorRetryInterval,
    errorRetryCount,
    onDiscarded,
    onError,
    onErrorRetry,
    onSuccess,
  };

  const core = useMemo(() => {
    if (!Moralis.Core.isStarted) {
      Moralis.start(moralisConfig);
    }
    return Moralis.Core;
  }, [moralisConfig]);

  return <MoralisContext.Provider value={{ core, fetchConfig }}>{children}</MoralisContext.Provider>;
};

export default MoralisProvider;
