import { ConfigValues, MoralisCore } from '@moralisweb3/core';
import { ICoreStart } from 'hooks/Core/useMoralisCore/types';

export interface ICoreContext extends Partial<ConfigValues> {
  Core: MoralisCore;
  isStarted: boolean;
  isStarting: boolean;
  start: ({ onComplete, onError, onSuccess, throwOnError = true }?: ICoreStart) => Promise<void>;
}
