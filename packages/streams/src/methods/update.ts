import { Endpoints } from '@moralisweb3/api-utils';
import { EvmAddressish, EvmChainish } from '@moralisweb3/evm-utils';
import { updateStreamEvm } from '../resolvers';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';

export interface UpdateStreamEvmOptions {
  networkType?: 'evm';
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

  return ({ networkType, ...options }: UpdateStreamOptions) => {
    switch (networkType) {
      case StreamNetwork.EVM:
        return evmFetcher({ ...options });
      default:
        if (networkType === undefined) {
          return evmFetcher({ ...options });
        }
        throw new IncorrectNetworkError(networkType);
    }
  };
};
