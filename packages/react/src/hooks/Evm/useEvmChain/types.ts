import { EvmChainish } from '@moralisweb3/core';
import { IDefaultCallbacks } from '../../types';
export interface IUseEvmChain<TParams = IDefaultCallbacks<void>> {
  (providedChain: EvmChainish, params?: IDefaultCallbacks<void> & TParams): void;
}
