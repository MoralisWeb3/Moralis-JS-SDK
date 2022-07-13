import { IDefaultCallbacks } from 'hooks/types';
import { EvmChainish } from '@moralisweb3/core';

export interface IChainCallbacks extends IDefaultCallbacks {
  onSuccess?: () => void;
}

export interface IAddChainIfNone {
  resolveUnrecognized?: () => void;
}

export interface ISwitchChainParams<
  ISwitchIChainCallbacks extends IChainCallbacks & IAddChainIfNone = IChainCallbacks & IAddChainIfNone,
> {
  (providedChain: EvmChainish, params?: ISwitchIChainCallbacks): void;
}

export interface IAddChainParams {
  (providedChain: EvmChainish, params?: IChainCallbacks): void;
}
