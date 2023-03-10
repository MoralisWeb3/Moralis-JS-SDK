import Moralis from 'moralis';
import { GetNFTOwnersRequest, GetNFTOwnersResponse, getNFTOwnersOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';

export type UseEvmNFTOwnersParams = UseMoralisQueryParams<GetNFTOwnersResponse, GetNFTOwnersRequest>

export function useEvmNFTOwners({ address,chain,format,limit,cursor,normalizeMetadata,disableTotal, ...queryParams }: UseEvmNFTOwnersParams = {}) {
  const resolver = usePaginatedOperationResolver(getNFTOwnersOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetNFTOwnersRequest] | undefined = useMemo(() => {
    if (address ) {
      return [
      getNFTOwnersOperation.id,
      {
        address,chain,format,limit,cursor,normalizeMetadata,disableTotal
      },
    ];
    }
      return;
  }, [address,chain,format,limit,cursor,normalizeMetadata,disableTotal]);

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