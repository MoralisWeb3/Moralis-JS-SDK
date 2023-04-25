import { GetAccountOperationRequest, AptosGetAccountResponse, GetAccountOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetAccountParams = Partial<GetAccountOperationRequest>;
export type UseGetAccountQueryOptions = QueryOptions<AptosGetAccountResponse, UseGetAccountParams>;

export function useGetAccount({ address, ledgerVersion, network }: UseGetAccountParams = {},  queryOptions: UseGetAccountQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetAccountOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetAccountOperationRequest>] = useMemo(() => {
    return [
      GetAccountOperation.operationId,
      {
        address, ledgerVersion, network
      },
    ];
  }, [address, ledgerVersion, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
