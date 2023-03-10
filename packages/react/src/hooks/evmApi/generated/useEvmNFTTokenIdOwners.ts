import Moralis from 'moralis';
import { GetNFTTokenIdOwnersRequest, GetNFTTokenIdOwnersResponse, getNFTTokenIdOwnersOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';

export type UseEvmNFTTokenIdOwnersParams = UseMoralisQueryParams<GetNFTTokenIdOwnersResponse, GetNFTTokenIdOwnersRequest>

export function useEvmNFTTokenIdOwners({ address,tokenId,chain,format,limit,cursor,normalizeMetadata,disableTotal, ...queryParams }: UseEvmNFTTokenIdOwnersParams = {}) {
  const resolver = usePaginatedOperationResolver(getNFTTokenIdOwnersOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetNFTTokenIdOwnersRequest] | undefined = useMemo(() => {
    if (address &&tokenId ) {
      return [
      getNFTTokenIdOwnersOperation.id,
      {
        address,tokenId,chain,format,limit,cursor,normalizeMetadata,disableTotal
      },
    ];
    }
      return;
  }, [address,tokenId,chain,format,limit,cursor,normalizeMetadata,disableTotal]);

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