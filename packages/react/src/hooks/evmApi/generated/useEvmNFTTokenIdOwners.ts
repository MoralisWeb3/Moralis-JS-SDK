import Moralis from 'moralis';
import { GetNFTTokenIdOwnersRequest, GetNFTTokenIdOwnersResponse, getNFTTokenIdOwnersOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmNFTTokenIdOwnersParams = Partial<GetNFTTokenIdOwnersRequest>;
export type UseEvmNFTTokenIdOwnersQueryOptions = QueryOptions<GetNFTTokenIdOwnersResponse, UseEvmNFTTokenIdOwnersParams>;

export function useEvmNFTTokenIdOwners({ address, tokenId, chain, format, limit, cursor, normalizeMetadata, disableTotal }: UseEvmNFTTokenIdOwnersParams = {}, queryOptions: UseEvmNFTTokenIdOwnersQueryOptions = {}) {
  const resolver = usePaginatedOperationResolver(getNFTTokenIdOwnersOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address && tokenId);
  }, [address, tokenId]);

  const queryKey: [string, Partial<GetNFTTokenIdOwnersRequest>] = useMemo(() => {
    return [
      getNFTTokenIdOwnersOperation.id,
      {
        address, tokenId, chain, format, limit, cursor, normalizeMetadata, disableTotal
      },
    ];
  }, [address, tokenId, chain, format, limit, cursor, normalizeMetadata, disableTotal]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address', 'tokenId']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}