import { GetNFTOwnersByCollectionOperationRequest, AptosNFTOwnersByCollectionResponse, GetNFTOwnersByCollectionOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetNFTOwnersByCollectionParams = Partial<GetNFTOwnersByCollectionOperationRequest>;
export type UseGetNFTOwnersByCollectionQueryOptions = QueryOptions<AptosNFTOwnersByCollectionResponse, UseGetNFTOwnersByCollectionParams>;

export function useGetNFTOwnersByCollection({ collectionDataIdHash, limit, offset, cursor, walletBlacklist, walletWhitelist, network }: UseGetNFTOwnersByCollectionParams = {},  queryOptions: UseGetNFTOwnersByCollectionQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetNFTOwnersByCollectionOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(collectionDataIdHash && limit);
  }, [collectionDataIdHash, limit]);

  const queryKey: [string, Partial<GetNFTOwnersByCollectionOperationRequest>] = useMemo(() => {
    return [
      GetNFTOwnersByCollectionOperation.operationId,
      {
        collectionDataIdHash, limit, offset, cursor, walletBlacklist, walletWhitelist, network
      },
    ];
  }, [collectionDataIdHash, limit, offset, cursor, walletBlacklist, walletWhitelist, network]);

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
