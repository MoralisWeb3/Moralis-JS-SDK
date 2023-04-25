import { GetTransactionByHashOperationRequest, AptosGetTransactionByHashValue, GetTransactionByHashOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetTransactionByHashParams = Partial<GetTransactionByHashOperationRequest>;
export type UseGetTransactionByHashQueryOptions = QueryOptions<AptosGetTransactionByHashValue, UseGetTransactionByHashParams>;

export function useGetTransactionByHash({ txnHash, network }: UseGetTransactionByHashParams = {},  queryOptions: UseGetTransactionByHashQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetTransactionByHashOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(txnHash);
  }, [txnHash]);

  const queryKey: [string, Partial<GetTransactionByHashOperationRequest>] = useMemo(() => {
    return [
      GetTransactionByHashOperation.operationId,
      {
        txnHash, network
      },
    ];
  }, [txnHash, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['txnHash']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
