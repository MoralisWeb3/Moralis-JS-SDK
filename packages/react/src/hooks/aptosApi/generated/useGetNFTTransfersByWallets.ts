import { GetNFTTransfersByWalletsOperationRequest, AptosNFTTransfersByWalletsResponse, GetNFTTransfersByWalletsOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetNFTTransfersByWalletsParams = Partial<GetNFTTransfersByWalletsOperationRequest>;
export type UseGetNFTTransfersByWalletsQueryOptions = QueryOptions<AptosNFTTransfersByWalletsResponse, UseGetNFTTransfersByWalletsParams>;

export function useGetNFTTransfersByWallets({ limit, offset, cursor, walletAddresses, collectionBlacklist, collectionWhitelist, network }: UseGetNFTTransfersByWalletsParams = {},  queryOptions: UseGetNFTTransfersByWalletsQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetNFTTransfersByWalletsOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(limit && walletAddresses);
  }, [limit, walletAddresses]);

  const queryKey: [string, Partial<GetNFTTransfersByWalletsOperationRequest>] = useMemo(() => {
    return [
      GetNFTTransfersByWalletsOperation.operationId,
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
