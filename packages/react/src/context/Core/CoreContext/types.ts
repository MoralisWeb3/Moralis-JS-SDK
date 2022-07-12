import Core, { ConfigValues } from '@moralisweb3/core';
import { ICoreStart } from 'hooks/Core/useMoralisCore/types';

export interface ICoreContext extends Partial<ConfigValues> {
  Core: typeof Core;
  isStarted: boolean;
  isStarting: boolean;
  start: ({ onComplete, onError, onSuccess, throwOnError }?: ICoreStart) => Promise<void>;
}
