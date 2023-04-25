import { GetTransactionByVersionOperationRequest, AptosGetTransactionByVersionValue, GetTransactionByVersionOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetTransactionByVersionParams = Partial<GetTransactionByVersionOperationRequest>;
export type UseGetTransactionByVersionQueryOptions = QueryOptions<AptosGetTransactionByVersionValue, UseGetTransactionByVersionParams>;

export function useGetTransactionByVersion({ txnVersion, network }: UseGetTransactionByVersionParams = {},  queryOptions: UseGetTransactionByVersionQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetTransactionByVersionOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(txnVersion);
  }, [txnVersion]);

  const queryKey: [string, Partial<GetTransactionByVersionOperationRequest>] = useMemo(() => {
    return [
      GetTransactionByVersionOperation.operationId,
      {
        txnVersion, network
      },
    ];
  }, [txnVersion, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['txnVersion']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
