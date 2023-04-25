import { GetAccountModulesOperationRequest, AptosGetAccountModuleResponse, GetAccountModulesOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetAccountModulesParams = Partial<GetAccountModulesOperationRequest>;
export type UseGetAccountModulesQueryOptions = QueryOptions<AptosGetAccountModuleResponse[], UseGetAccountModulesParams>;

export function useGetAccountModules({ address, ledgerVersion, limit, start, network }: UseGetAccountModulesParams = {},  queryOptions: UseGetAccountModulesQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetAccountModulesOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetAccountModulesOperationRequest>] = useMemo(() => {
    return [
      GetAccountModulesOperation.operationId,
      {
        address, ledgerVersion, limit, start, network
      },
    ];
  }, [address, ledgerVersion, limit, start, network]);

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
