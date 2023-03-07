import Moralis from 'moralis';
import React, { FC, createContext, useContext, useMemo } from 'react';
import { MoralisContextValue, MoralisProviderProps } from './types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

Moralis.Core.config.set('product', 'React SDK');

export const MoralisContext = createContext<MoralisContextValue | null>(null);

export const _useMoralisContext = () => {
  const context = useContext(MoralisContext);
  if (!context) {
    throw new Error(`Please wrap your application with MoralisProvider`);
  }
  return context;
};

const MoralisProvider: FC<MoralisProviderProps> = ({ children, config }) => {
  const { cacheTime, enabled, onError, onSettled, onSuccess, refetchInterval, suspense, ...moralisConfig } = config;

  const queryClient = new QueryClient({
    defaultOptions: { queries: { cacheTime, enabled, onError, onSettled, onSuccess, refetchInterval, suspense } },
  });

  const core = useMemo(() => {
    if (!Moralis.Core.isStarted) {
      Moralis.start(moralisConfig);
    }
    return Moralis.Core;
  }, [moralisConfig]);

  return (
    <QueryClientProvider client={queryClient}>
      <MoralisContext.Provider value={{ core }}>{children}</MoralisContext.Provider>
    </QueryClientProvider>
  );
};

export default MoralisProvider;
