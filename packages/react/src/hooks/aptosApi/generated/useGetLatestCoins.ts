import { GetLatestCoinsOperationRequest, AptosGetLatestCoinsResponse, GetLatestCoinsOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetLatestCoinsParams = Partial<GetLatestCoinsOperationRequest>;
export type UseGetLatestCoinsQueryOptions = QueryOptions<AptosGetLatestCoinsResponse, UseGetLatestCoinsParams>;

export function useGetLatestCoins({ limit, offset, cursor, network }: UseGetLatestCoinsParams = {},  queryOptions: UseGetLatestCoinsQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetLatestCoinsOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(limit);
  }, [limit]);

  const queryKey: [string, Partial<GetLatestCoinsOperationRequest>] = useMemo(() => {
    return [
      GetLatestCoinsOperation.operationId,
      {
        limit, offset, cursor, network
      },
    ];
  }, [limit, offset, cursor, network]);

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
