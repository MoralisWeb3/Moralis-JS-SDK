import { GetNFTsByCollectionOperationRequest, AptosNFTTokensByCollectionResponse, GetNFTsByCollectionOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetNFTsByCollectionParams = Partial<GetNFTsByCollectionOperationRequest>;
export type UseGetNFTsByCollectionQueryOptions = QueryOptions<AptosNFTTokensByCollectionResponse, UseGetNFTsByCollectionParams>;

export function useGetNFTsByCollection({ collectionDataIdHash, limit, offset, cursor, network }: UseGetNFTsByCollectionParams = {},  queryOptions: UseGetNFTsByCollectionQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetNFTsByCollectionOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(collectionDataIdHash && limit);
  }, [collectionDataIdHash, limit]);

  const queryKey: [string, Partial<GetNFTsByCollectionOperationRequest>] = useMemo(() => {
    return [
      GetNFTsByCollectionOperation.operationId,
      {
        collectionDataIdHash, limit, offset, cursor, network
      },
    ];
  }, [collectionDataIdHash, limit, offset, cursor, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['collectionDataIdHash', 'limit']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
