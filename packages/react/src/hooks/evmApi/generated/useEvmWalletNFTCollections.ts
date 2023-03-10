import Moralis from 'moralis';
import { GetWalletNFTCollectionsRequest, GetWalletNFTCollectionsResponse, getWalletNFTCollectionsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';

export type UseEvmWalletNFTCollectionsParams = UseMoralisQueryParams<GetWalletNFTCollectionsResponse, GetWalletNFTCollectionsRequest>

export function useEvmWalletNFTCollections({ address,chain,limit,cursor,disableTotal, ...queryParams }: UseEvmWalletNFTCollectionsParams = {}) {
  const resolver = usePaginatedOperationResolver(getWalletNFTCollectionsOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetWalletNFTCollectionsRequest] | undefined = useMemo(() => {
    if (address ) {
      return [
      getWalletNFTCollectionsOperation.id,
      {
        address,chain,limit,cursor,disableTotal
      },
    ];
    }
      return;
  }, [address,chain,limit,cursor,disableTotal]);

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