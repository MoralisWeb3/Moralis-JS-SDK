import { GetWalletsNFTTransfersOperationRequest, AptosNFTTransfersByWalletsResponse, GetWalletsNFTTransfersOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetWalletsNFTTransfersParams = Partial<GetWalletsNFTTransfersOperationRequest>;
export type UseGetWalletsNFTTransfersQueryOptions = QueryOptions<AptosNFTTransfersByWalletsResponse, UseGetWalletsNFTTransfersParams>;

export function useGetWalletsNFTTransfers({ limit, offset, cursor, walletAddresses, collectionBlacklist, collectionWhitelist, network }: UseGetWalletsNFTTransfersParams = {},  queryOptions: UseGetWalletsNFTTransfersQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetWalletsNFTTransfersOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(limit && walletAddresses);
  }, [limit, walletAddresses]);

  const queryKey: [string, Partial<GetWalletsNFTTransfersOperationRequest>] = useMemo(() => {
    return [
      GetWalletsNFTTransfersOperation.operationId,
      {
        limit, offset, cursor, walletAddresses, collectionBlacklist, collectionWhitelist, network
      },
    ];
  }, [limit, offset, cursor, walletAddresses, collectionBlacklist, collectionWhitelist, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['limit', 'walletAddresses']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
