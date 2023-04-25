import { GetNFTByOwnersOperationRequest, AptosNFTsByOwnersResponse, GetNFTByOwnersOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetNFTByOwnersParams = Partial<GetNFTByOwnersOperationRequest>;
export type UseGetNFTByOwnersQueryOptions = QueryOptions<AptosNFTsByOwnersResponse, UseGetNFTByOwnersParams>;

export function useGetNFTByOwners({ limit, offset, cursor, ownerAddresses, collectionBlacklist, collectionWhitelist, network }: UseGetNFTByOwnersParams = {},  queryOptions: UseGetNFTByOwnersQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetNFTByOwnersOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(limit && ownerAddresses);
  }, [limit, ownerAddresses]);

  const queryKey: [string, Partial<GetNFTByOwnersOperationRequest>] = useMemo(() => {
    return [
      GetNFTByOwnersOperation.operationId,
      {
        limit, offset, cursor, ownerAddresses, collectionBlacklist, collectionWhitelist, network
      },
    ];
  }, [limit, offset, cursor, ownerAddresses, collectionBlacklist, collectionWhitelist, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['limit', 'ownerAddresses']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
