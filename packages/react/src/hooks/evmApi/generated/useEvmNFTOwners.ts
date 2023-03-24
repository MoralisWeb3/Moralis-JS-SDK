import Moralis from 'moralis';
import { GetNFTOwnersRequest, GetNFTOwnersResponse, getNFTOwnersOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmNFTOwnersParams = Partial<GetNFTOwnersRequest>;
export type UseEvmNFTOwnersQueryOptions = QueryOptions<GetNFTOwnersResponse, UseEvmNFTOwnersParams>;

export function useEvmNFTOwners({ address, chain, format, limit, cursor, normalizeMetadata, disableTotal, mediaItems }: UseEvmNFTOwnersParams = {}, queryOptions: UseEvmNFTOwnersQueryOptions = {}) {
  const resolver = usePaginatedOperationResolver(getNFTOwnersOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetNFTOwnersRequest>] = useMemo(() => {
    return [
      getNFTOwnersOperation.id,
      {
        address, chain, format, limit, cursor, normalizeMetadata, disableTotal, mediaItems
      },
    ];
  }, [address, chain, format, limit, cursor, normalizeMetadata, disableTotal, mediaItems]);

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