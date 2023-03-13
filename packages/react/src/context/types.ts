import { QueryObserverOptions } from '@tanstack/react-query';
import { MoralisConfigValues } from 'moralis';
import { Core } from 'moralis/common-core';
import { ReactNode } from 'react';
import { MoralisQueryOptionKeys } from '../hooks/types';

export interface FetchConfig extends Pick<QueryObserverOptions<unknown, unknown>, MoralisQueryOptionKeys> {}

export interface MoralisContextValue {
  core: Core;
}

export type MoralisConfig = MoralisConfigValues & FetchConfig;

export interface MoralisProviderProps {
  children?: ReactNode;
  config: MoralisConfig;
}
