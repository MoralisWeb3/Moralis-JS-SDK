import { GetNFTTransfersByIdsOperationRequest, AptosNFTTransfersByTokensResponse, GetNFTTransfersByIdsOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetNFTTransfersByIdsParams = Partial<GetNFTTransfersByIdsOperationRequest>;
export type UseGetNFTTransfersByIdsQueryOptions = QueryOptions<AptosNFTTransfersByTokensResponse[], UseGetNFTTransfersByIdsParams>;

export function useGetNFTTransfersByIds({ limit, offset, cursor, walletBlacklist, walletWhitelist, tokenIds, network }: UseGetNFTTransfersByIdsParams = {},  queryOptions: UseGetNFTTransfersByIdsQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetNFTTransfersByIdsOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(limit && tokenIds);
  }, [limit, tokenIds]);

  const queryKey: [string, Partial<GetNFTTransfersByIdsOperationRequest>] = useMemo(() => {
    return [
      GetNFTTransfersByIdsOperation.operationId,
      {
        limit, offset, cursor, walletBlacklist, walletWhitelist, tokenIds, network
      },
    ];
  }, [limit, offset, cursor, walletBlacklist, walletWhitelist, tokenIds, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['limit', 'tokenIds']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
