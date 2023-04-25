import { GetTopHoldersByCoinOperationRequest, AptosGetTopHoldersByCoinResponse, GetTopHoldersByCoinOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetTopHoldersByCoinParams = Partial<GetTopHoldersByCoinOperationRequest>;
export type UseGetTopHoldersByCoinQueryOptions = QueryOptions<AptosGetTopHoldersByCoinResponse, UseGetTopHoldersByCoinParams>;

export function useGetTopHoldersByCoin({ coinTypeHash, limit, offset, cursor, minAmount, minVersion, walletBlacklist, walletWhitelist, network }: UseGetTopHoldersByCoinParams = {},  queryOptions: UseGetTopHoldersByCoinQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetTopHoldersByCoinOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(coinTypeHash && limit);
  }, [coinTypeHash, limit]);

  const queryKey: [string, Partial<GetTopHoldersByCoinOperationRequest>] = useMemo(() => {
    return [
      GetTopHoldersByCoinOperation.operationId,
      {
        coinTypeHash, limit, offset, cursor, minAmount, minVersion, walletBlacklist, walletWhitelist, network
      },
    ];
  }, [coinTypeHash, limit, offset, cursor, minAmount, minVersion, walletBlacklist, walletWhitelist, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['coinTypeHash', 'limit']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
