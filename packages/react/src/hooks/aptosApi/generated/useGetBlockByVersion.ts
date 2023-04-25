import { GetBlockByVersionOperationRequest, AptosBlock, GetBlockByVersionOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetBlockByVersionParams = Partial<GetBlockByVersionOperationRequest>;
export type UseGetBlockByVersionQueryOptions = QueryOptions<AptosBlock, UseGetBlockByVersionParams>;

export function useGetBlockByVersion({ version, withTransactions, network }: UseGetBlockByVersionParams = {},  queryOptions: UseGetBlockByVersionQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetBlockByVersionOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(version);
  }, [version]);

  const queryKey: [string, Partial<GetBlockByVersionOperationRequest>] = useMemo(() => {
    return [
      GetBlockByVersionOperation.operationId,
      {
        version, withTransactions, network
      },
    ];
  }, [version, withTransactions, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['version']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
