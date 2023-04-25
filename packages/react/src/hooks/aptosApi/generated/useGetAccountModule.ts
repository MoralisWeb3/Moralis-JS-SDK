import { GetAccountModuleOperationRequest, AptosGetAccountModuleResponse, GetAccountModuleOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetAccountModuleParams = Partial<GetAccountModuleOperationRequest>;
export type UseGetAccountModuleQueryOptions = QueryOptions<AptosGetAccountModuleResponse, UseGetAccountModuleParams>;

export function useGetAccountModule({ address, moduleName, ledgerVersion, network }: UseGetAccountModuleParams = {},  queryOptions: UseGetAccountModuleQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetAccountModuleOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address && moduleName);
  }, [address, moduleName]);

  const queryKey: [string, Partial<GetAccountModuleOperationRequest>] = useMemo(() => {
    return [
      GetAccountModuleOperation.operationId,
      {
        address, moduleName, ledgerVersion, network
      },
    ];
  }, [address, moduleName, ledgerVersion, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address', 'moduleName']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
