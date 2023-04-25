import { GetNFTCollectionsByIdsOperationRequest, AptosNFTCollectionItemResponse, GetNFTCollectionsByIdsOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetNFTCollectionsByIdsParams = Partial<GetNFTCollectionsByIdsOperationRequest>;
export type UseGetNFTCollectionsByIdsQueryOptions = QueryOptions<AptosNFTCollectionItemResponse[], UseGetNFTCollectionsByIdsParams>;

export function useGetNFTCollectionsByIds({ ids, network }: UseGetNFTCollectionsByIdsParams = {},  queryOptions: UseGetNFTCollectionsByIdsQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetNFTCollectionsByIdsOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(ids);
  }, [ids]);

  const queryKey: [string, Partial<GetNFTCollectionsByIdsOperationRequest>] = useMemo(() => {
    return [
      GetNFTCollectionsByIdsOperation.operationId,
      {
        ids, network
      },
    ];
  }, [ids, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['ids']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
