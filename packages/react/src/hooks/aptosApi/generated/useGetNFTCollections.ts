import { GetNFTCollectionsOperationRequest, AptosNFTCollectionsByNameRangeResponse, GetNFTCollectionsOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetNFTCollectionsParams = Partial<GetNFTCollectionsOperationRequest>;
export type UseGetNFTCollectionsQueryOptions = QueryOptions<AptosNFTCollectionsByNameRangeResponse, UseGetNFTCollectionsParams>;

export function useGetNFTCollections({ limit, offset, cursor, fromName, toName, network }: UseGetNFTCollectionsParams = {},  queryOptions: UseGetNFTCollectionsQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetNFTCollectionsOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(limit);
  }, [limit]);

  const queryKey: [string, Partial<GetNFTCollectionsOperationRequest>] = useMemo(() => {
    return [
      GetNFTCollectionsOperation.operationId,
      {
        limit, offset, cursor, fromName, toName, network
      },
    ];
  }, [limit, offset, cursor, fromName, toName, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['limit']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
