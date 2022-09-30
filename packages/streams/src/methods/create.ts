import { Endpoints } from '@moralisweb3/api-utils';
import { EvmAddressish, EvmChainish } from '@moralisweb3/evm-utils';
import { createStreamEvm } from '../resolvers';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { StreamNetwork } from '../utils/StreamNetwork';

export interface CreateStreamEvmOptions {
  network: 'evm';
  webhookUrl: string;
  description: string;
  tag: string;
  tokenAddress?: EvmAddressish;
  includeNativeTxs?: boolean;
  topic0?: string;
  abi?: {
    [key: string]: unknown;
  };
  filter?: {
    [key: string]: unknown;
  };
  address?: EvmAddressish;
  chains: EvmChainish[];
  type: 'wallet' | 'contract';
}

export type CreateStreamOptions = CreateStreamEvmOptions;

export const makeCreateStream = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createFetcher(createStreamEvm);

  return ({ network, ...options }: CreateStreamOptions) => {
    switch (network) {
      case StreamNetwork.EVM:
        return evmFetcher({ ...options });
      default:
        throw new IncorrectNetworkError(network);
    }
  };
};
