import Moralis from 'moralis';
import React, { FC, createContext, useContext, useMemo } from 'react';
import { FetchConfig, MoralisContextValue, MoralisProviderProps } from './types';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

Moralis.Core.config.set('product', 'React SDK');

export const MoralisContext = createContext<(MoralisContextValue & QueryClient) | null>(null);

export const _useMoralisContext = () => {
  const context = useContext(MoralisContext);
  if (!context) {
    throw new Error(`Please wrap your application with MoralisProvider`);
  }
  return context;
};

const MoralisProvider: FC<MoralisProviderProps> = ({ children }) => {
  // const {
  //   revalidateOnMount,
  //   revalidateIfStale,
  //   revalidateOnFocus = false,
  //   revalidateOnReconnect,
  //   refreshInterval,
  //   refreshWhenHidden,
  //   refreshWhenOffline,
  //   shouldRetryOnError,
  //   dedupingInterval,
  //   focusThrottleInterval,
  //   loadingTimeout,
  //   errorRetryInterval,
  //   errorRetryCount,
  //   onDiscarded = () => undefined,
  //   onError = () => undefined,
  //   onErrorRetry = () => undefined,
  //   onSuccess = () => undefined,
  //   ...moralisConfig
  // } = config;

  // const fetchConfig: FetchConfig = {
  //   revalidateOnFocus,
  //   revalidateOnMount,
  //   revalidateIfStale,
  //   revalidateOnReconnect,
  //   refreshInterval,
  //   refreshWhenHidden,
  //   refreshWhenOffline,
  //   shouldRetryOnError,
  //   dedupingInterval,
  //   focusThrottleInterval,
  //   loadingTimeout,
  //   errorRetryInterval,
  //   errorRetryCount,
  //   onDiscarded,
  //   onError,
  //   onErrorRetry,
  //   onSuccess,
  // };

  // const queryClientContext = React.createContext<QueryClient | undefined>(undefined);

  const core = useMemo(() => {
    if (!Moralis.Core.isStarted) {
      Moralis.start(moralisConfig);
    }
    return Moralis.Core;
  }, [moralisConfig]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MoralisContext.Provider value={{ core }}>{children}</MoralisContext.Provider>
    </QueryClientProvider>
  );
};

export default MoralisProvider;
