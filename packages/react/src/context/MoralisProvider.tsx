import { Core } from 'moralis/common-core';
import Moralis from 'moralis';
import { MoralisConfigValues } from 'moralis/lib/config/MoralisConfig';
import React, { useContext, useMemo } from 'react';
import { SWRConfiguration } from 'swr';

export interface MoralisContextValue {
  core: Core;
  swrConfig?: FetchConfig;
}

export const MoralisContext = React.createContext<MoralisContextValue | null>(null);

export interface FetchConfig extends Omit<SWRConfiguration, 'fetcher' | 'revalidateOnMount'> {
  /**
   * Enable or disable automatic data fetching when component is mounted.
   * Use `fetch` returned from the hook to trigger data fetch manually
   */
  revalidateOnMount?: boolean;
}

export const _useClient = () => {
  const context = useContext(MoralisContext);
  if (!context) {
    throw new Error(`Please wrap your application with MoralisProvider`);
  }
  return context;
};

export interface MoralisProviderProps {
  children?: React.ReactNode;
  config: MoralisConfigValues;
  fetchConfig?: FetchConfig;
}

const MoralisProvider: React.FC<MoralisProviderProps> = ({ children, config, fetchConfig }) => {
  const swrConfig = {
    revalidateOnFocus: false,
    // revalidateIfStale: false,
    // revalidateOnMount: false
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
    ...fetchConfig,
  };
  const core = useMemo(() => {
    if (!Moralis.Core.isStarted) {
      Moralis.start(config);
    }
    return Moralis.Core;
  }, [config]);

  return <MoralisContext.Provider value={{ core, swrConfig }}>{children}</MoralisContext.Provider>;
};

export default MoralisProvider;
