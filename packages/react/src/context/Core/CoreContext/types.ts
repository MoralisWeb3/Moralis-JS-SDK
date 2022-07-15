import { ConfigValues, MoralisCore } from '@moralisweb3/core';
import { IDefaultCallbacks } from '../../../hooks/types';

export interface ICoreContext extends Partial<ConfigValues> {
  Core: MoralisCore;
  isStarted: boolean;
  isStarting: boolean;
  start: ({ onComplete, onError, onSuccess, throwOnError = true }?: IDefaultCallbacks<void>) => Promise<void | null>;
}
