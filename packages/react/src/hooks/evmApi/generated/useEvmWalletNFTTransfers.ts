import Moralis from 'moralis';
import { GetWalletNFTTransfersRequest, GetWalletNFTTransfersResponse, getWalletNFTTransfersOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmWalletNFTTransfersParams = Partial<GetWalletNFTTransfersRequest>;
export type UseEvmWalletNFTTransfersQueryOptions = QueryOptions<GetWalletNFTTransfersResponse, UseEvmWalletNFTTransfersParams>;

export function useEvmWalletNFTTransfers({ address, chain, format, direction, fromBlock, toBlock, limit, cursor, disableTotal }: UseEvmWalletNFTTransfersParams = {}, queryOptions: UseEvmWalletNFTTransfersQueryOptions = {}) {
  const resolver = usePaginatedOperationResolver(getWalletNFTTransfersOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetWalletNFTTransfersRequest>] = useMemo(() => {
    return [
      getWalletNFTTransfersOperation.id,
      {
        address, chain, format, direction, fromBlock, toBlock, limit, cursor, disableTotal
      },
    ];
  }, [address, chain, format, direction, fromBlock, toBlock, limit, cursor, disableTotal]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}