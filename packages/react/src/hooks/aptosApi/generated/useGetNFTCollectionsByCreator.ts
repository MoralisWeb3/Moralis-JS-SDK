import { GetNFTCollectionsByCreatorOperationRequest, AptosNFTCollectionsByCreatorResponse, GetNFTCollectionsByCreatorOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetNFTCollectionsByCreatorParams = Partial<GetNFTCollectionsByCreatorOperationRequest>;
export type UseGetNFTCollectionsByCreatorQueryOptions = QueryOptions<AptosNFTCollectionsByCreatorResponse, UseGetNFTCollectionsByCreatorParams>;

export function useGetNFTCollectionsByCreator({ limit, offset, cursor, creatorAddress, network }: UseGetNFTCollectionsByCreatorParams = {},  queryOptions: UseGetNFTCollectionsByCreatorQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetNFTCollectionsByCreatorOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(limit && creatorAddress);
  }, [limit, creatorAddress]);

  const queryKey: [string, Partial<GetNFTCollectionsByCreatorOperationRequest>] = useMemo(() => {
    return [
      GetNFTCollectionsByCreatorOperation.operationId,
      {
        limit, offset, cursor, creatorAddress, network
      },
    ];
  }, [limit, offset, cursor, creatorAddress, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['limit', 'creatorAddress']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
