import { GetNFTOwnersOfCollectionOperationRequest, AptosNFTOwnersOfCollectionResponse, GetNFTOwnersOfCollectionOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetNFTOwnersOfCollectionParams = Partial<GetNFTOwnersOfCollectionOperationRequest>;
export type UseGetNFTOwnersOfCollectionQueryOptions = QueryOptions<AptosNFTOwnersOfCollectionResponse, UseGetNFTOwnersOfCollectionParams>;

export function useGetNFTOwnersOfCollection({ collectionDataIdHash, limit, offset, cursor, network }: UseGetNFTOwnersOfCollectionParams = {},  queryOptions: UseGetNFTOwnersOfCollectionQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetNFTOwnersOfCollectionOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(collectionDataIdHash && limit);
  }, [collectionDataIdHash, limit]);

  const queryKey: [string, Partial<GetNFTOwnersOfCollectionOperationRequest>] = useMemo(() => {
    return [
      GetNFTOwnersOfCollectionOperation.operationId,
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
