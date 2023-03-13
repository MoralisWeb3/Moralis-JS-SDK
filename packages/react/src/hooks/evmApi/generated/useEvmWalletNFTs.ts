import Moralis from 'moralis';
import { GetWalletNFTsRequest, GetWalletNFTsResponse, getWalletNFTsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmWalletNFTsParams = UseMoralisQueryParams<GetWalletNFTsResponse, Partial<GetWalletNFTsRequest>>

export function useEvmWalletNFTs({ address, chain, format, limit, tokenAddresses, cursor, normalizeMetadata, disableTotal, ...queryParams }: UseEvmWalletNFTsParams = {}) {
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
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}