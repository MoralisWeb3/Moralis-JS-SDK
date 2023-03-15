import Core from '@moralisweb3/common-core';
import { SWRConfiguration } from 'swr';
import { MoralisConfigValues } from 'moralis';
import { ReactNode } from 'react';

export interface FetchConfig
  extends Pick<
    SWRConfiguration,
    | 'revalidateOnMount'
    | 'revalidateIfStale'
    | 'revalidateOnFocus'
    | 'revalidateOnReconnect'
    | 'refreshInterval'
    | 'refreshWhenHidden'
    | 'refreshWhenOffline'
    | 'shouldRetryOnError'
    | 'dedupingInterval'
    | 'focusThrottleInterval'
    | 'loadingTimeout'
    | 'errorRetryInterval'
    | 'errorRetryCount'
    | 'onError'
    | 'onSuccess'
    | 'onErrorRetry'
    | 'onDiscarded'
  > {}

export interface MoralisContextValue {
  core: Core;
  fetchConfig?: FetchConfig;
}

export type MoralisConfig = MoralisConfigValues & FetchConfig;

export interface MoralisProviderProps {
  children?: ReactNode;
  config: MoralisConfig;
}
