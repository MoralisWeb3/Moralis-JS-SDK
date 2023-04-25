import { GetHistoricalCoinBalancesByWalletsOperationRequest, AptosGetHistoricalCoinBalancesByWalletsResponse, GetHistoricalCoinBalancesByWalletsOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetHistoricalCoinBalancesByWalletsParams = Partial<GetHistoricalCoinBalancesByWalletsOperationRequest>;
export type UseGetHistoricalCoinBalancesByWalletsQueryOptions = QueryOptions<AptosGetHistoricalCoinBalancesByWalletsResponse, UseGetHistoricalCoinBalancesByWalletsParams>;

export function useGetHistoricalCoinBalancesByWallets({ limit, offset, cursor, ownerAddresses, coinTypeHashBlacklist, coinTypeHashWhitelist, network }: UseGetHistoricalCoinBalancesByWalletsParams = {},  queryOptions: UseGetHistoricalCoinBalancesByWalletsQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetHistoricalCoinBalancesByWalletsOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(limit && ownerAddresses);
  }, [limit, ownerAddresses]);

  const queryKey: [string, Partial<GetHistoricalCoinBalancesByWalletsOperationRequest>] = useMemo(() => {
    return [
      GetHistoricalCoinBalancesByWalletsOperation.operationId,
      {
        limit, offset, cursor, ownerAddresses, coinTypeHashBlacklist, coinTypeHashWhitelist, network
      },
    ];
  }, [limit, offset, cursor, ownerAddresses, coinTypeHashBlacklist, coinTypeHashWhitelist, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['limit', 'ownerAddresses']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
