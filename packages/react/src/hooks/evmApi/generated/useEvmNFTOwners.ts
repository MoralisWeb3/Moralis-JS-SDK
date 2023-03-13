import Moralis from 'moralis';
import { GetNFTOwnersRequest, GetNFTOwnersResponse, getNFTOwnersOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmNFTOwnersParams = UseMoralisQueryParams<GetNFTOwnersResponse, Partial<GetNFTOwnersRequest>>

export function useEvmNFTOwners({ address, chain, format, limit, cursor, normalizeMetadata, disableTotal, ...queryParams }: UseEvmNFTOwnersParams = {}) {
  const resolver = usePaginatedOperationResolver(getNFTOwnersOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetNFTOwnersRequest>] = useMemo(() => {
    return [
      getNFTOwnersOperation.id,
      {
        address, chain, format, limit, cursor, normalizeMetadata, disableTotal
      },
    ];
  }, [address, chain, format, limit, cursor, normalizeMetadata, disableTotal]);

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