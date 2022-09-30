import { Endpoints } from '@moralisweb3/api-utils';
import { EvmAddressish, EvmChainish } from '@moralisweb3/evm-utils';
import { updateStreamEvm } from '../resolvers';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';

export interface UpdateStreamEvmOptions {
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
  id: string;
}

export type UpdateStreamOptions = UpdateStreamEvmOptions;

export const makeUpdateStream = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createFetcher(updateStreamEvm);

  return ({ network, ...options }: UpdateStreamOptions) => {
    switch (network) {
      case StreamNetwork.EVM:
        return evmFetcher({ ...options });
      default:
        throw new IncorrectNetworkError(network);
    }
  };
};
