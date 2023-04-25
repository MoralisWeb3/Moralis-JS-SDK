import { GetCoinsByNameRangeOperationRequest, AptosGetCoinsByNameRangeResponse, GetCoinsByNameRangeOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetCoinsByNameRangeParams = Partial<GetCoinsByNameRangeOperationRequest>;
export type UseGetCoinsByNameRangeQueryOptions = QueryOptions<AptosGetCoinsByNameRangeResponse, UseGetCoinsByNameRangeParams>;

export function useGetCoinsByNameRange({ limit, offset, cursor, fromName, toName, network }: UseGetCoinsByNameRangeParams = {},  queryOptions: UseGetCoinsByNameRangeQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetCoinsByNameRangeOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(limit);
  }, [limit]);

  const queryKey: [string, Partial<GetCoinsByNameRangeOperationRequest>] = useMemo(() => {
    return [
      GetCoinsByNameRangeOperation.operationId,
      {
        limit, offset, cursor, fromName, toName, network
      },
    ];
  }, [limit, offset, cursor, fromName, toName, network]);

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
