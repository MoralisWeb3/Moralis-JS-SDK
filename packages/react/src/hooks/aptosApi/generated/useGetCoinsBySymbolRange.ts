import { GetCoinsBySymbolRangeOperationRequest, AptosGetCoinsBySymbolRangeResponse, GetCoinsBySymbolRangeOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetCoinsBySymbolRangeParams = Partial<GetCoinsBySymbolRangeOperationRequest>;
export type UseGetCoinsBySymbolRangeQueryOptions = QueryOptions<AptosGetCoinsBySymbolRangeResponse, UseGetCoinsBySymbolRangeParams>;

export function useGetCoinsBySymbolRange({ limit, offset, cursor, fromSymbol, toSymbol, network }: UseGetCoinsBySymbolRangeParams = {},  queryOptions: UseGetCoinsBySymbolRangeQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetCoinsBySymbolRangeOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(limit);
  }, [limit]);

  const queryKey: [string, Partial<GetCoinsBySymbolRangeOperationRequest>] = useMemo(() => {
    return [
      GetCoinsBySymbolRangeOperation.operationId,
      {
        limit, offset, cursor, fromSymbol, toSymbol, network
      },
    ];
  }, [limit, offset, cursor, fromSymbol, toSymbol, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['limit']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
