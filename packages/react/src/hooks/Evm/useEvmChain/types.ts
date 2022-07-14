import { IDefaultCallbacks } from 'hooks/types';
import { EvmChainish } from '@moralisweb3/core';
export interface IUseEvmChain<TParams = IDefaultCallbacks<void>> {
  (providedChain: EvmChainish, params?: IDefaultCallbacks<void> & TParams): void;
}
