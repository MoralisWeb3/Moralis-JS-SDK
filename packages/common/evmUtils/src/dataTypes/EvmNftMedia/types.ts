import { DateInput } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish } from '../EvmChain';

export type EvmNftMediaCategory = 'image' | 'video' | 'audio';

export type EvmNftMediaItem = {
  height: number;
  width: number;
  url: string;
};

export interface EvmNftMediaInput {
  chain: EvmChainish;
  status: string;
  updatedAt: DateInput;
  originalMediaUrl: string;
  category?: EvmNftMediaCategory;
  mimetype?: string;
  parentHash?: string;
  mediaCollection?: {
    original: EvmNftMediaItem;
    low: EvmNftMediaItem;
    medium: EvmNftMediaItem;
    high: EvmNftMediaItem;
  };
}

export interface EvmNftMediaData {
  chain: EvmChain;
  status: string;
  updatedAt: Date;
  originalMediaUrl: string;
  category?: EvmNftMediaCategory;
  mimetype?: string;
  parentHash?: string;
  mediaCollection?: {
    original: EvmNftMediaItem;
    low: EvmNftMediaItem;
    medium: EvmNftMediaItem;
    high: EvmNftMediaItem;
  };
}
