import Moralis from 'moralis';
import { GetWalletNFTsRequest, GetWalletNFTsResponse, getWalletNFTsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmWalletNFTsParams = Partial<GetWalletNFTsRequest>;
export type UseEvmWalletNFTsQueryOptions = QueryOptions<GetWalletNFTsResponse, UseEvmWalletNFTsParams>;

export function useEvmWalletNFTs({ address, chain, format, limit, tokenAddresses, cursor, normalizeMetadata, disableTotal }: UseEvmWalletNFTsParams = {}, queryOptions: UseEvmWalletNFTsQueryOptions = {}) {
  const resolver = usePaginatedOperationResolver(getWalletNFTsOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetWalletNFTsRequest>] = useMemo(() => {
    return [
      getWalletNFTsOperation.id,
      {
        address, chain, format, limit, tokenAddresses, cursor, normalizeMetadata, disableTotal
      },
    ];
  }, [address, chain, format, limit, tokenAddresses, cursor, normalizeMetadata, disableTotal]);

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