import { GetCoinBalancesByWalletsOperationRequest, AptosGetCoinBalancesByWalletsResponse, GetCoinBalancesByWalletsOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetCoinBalancesByWalletsParams = Partial<GetCoinBalancesByWalletsOperationRequest>;
export type UseGetCoinBalancesByWalletsQueryOptions = QueryOptions<AptosGetCoinBalancesByWalletsResponse, UseGetCoinBalancesByWalletsParams>;

export function useGetCoinBalancesByWallets({ limit, offset, cursor, ownerAddresses, coinTypeHashBlacklist, coinTypeHashWhitelist, network }: UseGetCoinBalancesByWalletsParams = {},  queryOptions: UseGetCoinBalancesByWalletsQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetCoinBalancesByWalletsOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(limit && ownerAddresses);
  }, [limit, ownerAddresses]);

  const queryKey: [string, Partial<GetCoinBalancesByWalletsOperationRequest>] = useMemo(() => {
    return [
      GetCoinBalancesByWalletsOperation.operationId,
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
