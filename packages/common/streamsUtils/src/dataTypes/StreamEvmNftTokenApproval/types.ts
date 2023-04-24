import { EvmChain, EvmChainish } from '@moralisweb3/common-evm-utils';
import { INFTApproval } from '@moralisweb3/streams-typings';

export type StreamEvmNftTokenApprovalish = INFTApproval & {
  chain: EvmChainish;
};

export type StreamEvmNftTokenApprovalData = INFTApproval & {
  chain: EvmChain;
};
