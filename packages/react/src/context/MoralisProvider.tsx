import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Moralis from 'moralis';
import React, { FC, createContext, useMemo } from 'react';
import { MoralisContextValue, MoralisProviderProps } from './types';

Moralis.Core.config.set('product', 'React SDK');

export const MoralisContext = createContext<MoralisContextValue | null>(null);

const MoralisProvider: FC<MoralisProviderProps> = ({
  children,
  config: {
    cacheTime,
    enabled,
    onError,
    onSettled,
    onSuccess,
    refetchInterval,
    refetchOnWindowFocus = false,
    staleTime,
    suspense,
    ...moralisConfig
  },
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime,
        enabled,
        onError,
        onSettled,
        onSuccess,
        refetchInterval,
        refetchOnWindowFocus,
        staleTime,
        suspense,
      },
    },
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
