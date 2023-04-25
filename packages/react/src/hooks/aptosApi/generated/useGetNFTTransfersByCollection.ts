import { GetNFTTransfersByCollectionOperationRequest, AptosGetNFTTransfersByCollectionResponse, GetNFTTransfersByCollectionOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetNFTTransfersByCollectionParams = Partial<GetNFTTransfersByCollectionOperationRequest>;
export type UseGetNFTTransfersByCollectionQueryOptions = QueryOptions<AptosGetNFTTransfersByCollectionResponse, UseGetNFTTransfersByCollectionParams>;

export function useGetNFTTransfersByCollection({ collectionDataIdHash, limit, offset, cursor, walletWhitelist, walletBlacklist, network }: UseGetNFTTransfersByCollectionParams = {},  queryOptions: UseGetNFTTransfersByCollectionQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetNFTTransfersByCollectionOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(collectionDataIdHash && limit);
  }, [collectionDataIdHash, limit]);

  const queryKey: [string, Partial<GetNFTTransfersByCollectionOperationRequest>] = useMemo(() => {
    return [
      GetNFTTransfersByCollectionOperation.operationId,
      {
        collectionDataIdHash, limit, offset, cursor, walletWhitelist, walletBlacklist, network
      },
    ];
  }, [collectionDataIdHash, limit, offset, cursor, walletWhitelist, walletBlacklist, network]);

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
