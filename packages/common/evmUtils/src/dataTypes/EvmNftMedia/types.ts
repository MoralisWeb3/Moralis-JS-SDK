import { DateInput } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish } from '../EvmChain';

export type EvmNftMediaCategory = 'image' | 'video' | 'audio';
export type EvmNftMediaStatus =
  | 'success'
  | 'processing'
  | 'unsupported_media'
  | 'invalid_url'
  | 'host_unavailable'
  | 'temporarily_unavailable';

export type EvmNftMediaItem = {
  height: number;
  width: number;
  url: string;
};

export interface EvmNftMediaInput {
  chain: EvmChainish;
  status?: EvmNftMediaStatus;
  updatedAt?: DateInput;
  originalMediaUrl?: string;
  category?: EvmNftMediaCategory;
  mimetype?: string;
  parentHash?: string;
  mediaCollection?: {
    low: EvmNftMediaItem;
    medium: EvmNftMediaItem;
    high: EvmNftMediaItem;
  };
}

export interface EvmNftMediaData {
  chain: EvmChain;
  status?: EvmNftMediaStatus;
  updatedAt?: Date;
  originalMediaUrl?: string;
  category?: EvmNftMediaCategory;
  mimetype?: string;
  parentHash?: string;
  mediaCollection?: {
    low: EvmNftMediaItem;
    medium: EvmNftMediaItem;
    high: EvmNftMediaItem;
  };
}
