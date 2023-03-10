import Moralis from 'moralis';
import { GetWalletNFTsRequest, GetWalletNFTsResponse, getWalletNFTsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';

export type UseEvmWalletNFTsParams = UseMoralisQueryParams<GetWalletNFTsResponse, GetWalletNFTsRequest>

export function useEvmWalletNFTs({ address, chain, format, limit, tokenAddresses, cursor, normalizeMetadata, disableTotal, ...queryParams }: UseEvmWalletNFTsParams = {}) {
  const resolver = usePaginatedOperationResolver(getWalletNFTsOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetWalletNFTsRequest] | undefined = useMemo(() => {
    if (address) {
      return [
      getWalletNFTsOperation.id,
      {
        address, chain, format, limit, tokenAddresses, cursor, normalizeMetadata, disableTotal
      },
    ];
    }
      return;
  }, [address, chain, format, limit, tokenAddresses, cursor, normalizeMetadata, disableTotal]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const response = await resolver.fetch(request);
      return response.result;
    },
    ...queryParams,
    enabled: queryKey && queryParams.enabled,
  });
}