import { GetCoinTransfersByCoinTypeOperationRequest, AptosGetCoinTransfersByCoinTypeResponse, GetCoinTransfersByCoinTypeOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetCoinTransfersByCoinTypeParams = Partial<GetCoinTransfersByCoinTypeOperationRequest>;
export type UseGetCoinTransfersByCoinTypeQueryOptions = QueryOptions<AptosGetCoinTransfersByCoinTypeResponse, UseGetCoinTransfersByCoinTypeParams>;

export function useGetCoinTransfersByCoinType({ coinType, limit, offset, cursor, fromDate, toDate, network }: UseGetCoinTransfersByCoinTypeParams = {},  queryOptions: UseGetCoinTransfersByCoinTypeQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetCoinTransfersByCoinTypeOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(coinType && limit);
  }, [coinType, limit]);

  const queryKey: [string, Partial<GetCoinTransfersByCoinTypeOperationRequest>] = useMemo(() => {
    return [
      GetCoinTransfersByCoinTypeOperation.operationId,
      {
        coinType, limit, offset, cursor, fromDate, toDate, network
      },
    ];
  }, [coinType, limit, offset, cursor, fromDate, toDate, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['coinType', 'limit']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
