import Core from '@moralisweb3/common-core';
// import { SWRConfiguration } from 'swr';
import { MoralisConfigValues } from 'moralis/lib/config/MoralisConfig';
import { ReactNode } from 'react';
import { QueryObserverOptions } from '@tanstack/react-query';
import { QueryOptionKeys } from '../hooks/useQuery';

export interface FetchConfig extends Pick<QueryObserverOptions<unknown, unknown>, QueryOptionKeys> {}

export interface MoralisContextValue {
  core: Core;
  // fetchConfig?: FetchConfig;
}

export type MoralisConfig = MoralisConfigValues & FetchConfig;

export interface MoralisProviderProps {
  children?: ReactNode;
  config: MoralisConfig;
}
