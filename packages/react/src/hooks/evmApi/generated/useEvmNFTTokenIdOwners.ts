import Moralis from 'moralis';
import { GetNFTTokenIdOwnersRequest, GetNFTTokenIdOwnersResponse, getNFTTokenIdOwnersOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmNFTTokenIdOwnersParams = UseMoralisQueryParams<GetNFTTokenIdOwnersResponse, Partial<GetNFTTokenIdOwnersRequest>>

export function useEvmNFTTokenIdOwners({ address, tokenId, chain, format, limit, cursor, normalizeMetadata, disableTotal, ...queryParams }: UseEvmNFTTokenIdOwnersParams = {}) {
  const resolver = usePaginatedOperationResolver(getNFTTokenIdOwnersOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address && tokenId);
  }, [address , tokenId]);

  const queryKey: [string, Partial<GetNFTTokenIdOwnersRequest>] = useMemo(() => {
    return [
      getNFTTokenIdOwnersOperation.id,
      {
        address, tokenId, chain, format, limit, cursor, normalizeMetadata, disableTotal
      },
    ];
  }, [address, tokenId, chain, format, limit, cursor, normalizeMetadata, disableTotal]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address', 'tokenId']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}