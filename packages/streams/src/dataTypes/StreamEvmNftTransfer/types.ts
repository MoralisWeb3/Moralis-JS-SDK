import { EvmNftTransferInput } from '@moralisweb3/evm-utils';

export interface StreamEvmNftTransferStreamsData {
  tag: string;
  tokenName: string;
  tokenSymbol: string;
}

export type StreamEvmNftTransferInput = EvmNftTransferInput & StreamEvmNftTransferStreamsData;
