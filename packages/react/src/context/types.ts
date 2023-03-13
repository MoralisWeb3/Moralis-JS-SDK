import Core, { MoralisCoreConfigValues } from '@moralisweb3/common-core';
import { QueryObserverOptions } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { MoralisQueryOptionKeys } from '../hooks/types';

export interface FetchConfig extends Pick<QueryObserverOptions<unknown, unknown>, MoralisQueryOptionKeys> {}

export interface MoralisContextValue {
  core: Core;
}

export type MoralisConfig = MoralisCoreConfigValues & FetchConfig;

export interface MoralisProviderProps {
  children?: ReactNode;
  config: MoralisConfig;
}
