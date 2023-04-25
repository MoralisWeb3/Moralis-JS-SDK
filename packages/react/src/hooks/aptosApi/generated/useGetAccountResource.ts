import { GetAccountResourceOperationRequest, AptosGetAccountResourceResponse, GetAccountResourceOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetAccountResourceParams = Partial<GetAccountResourceOperationRequest>;
export type UseGetAccountResourceQueryOptions = QueryOptions<AptosGetAccountResourceResponse, UseGetAccountResourceParams>;

export function useGetAccountResource({ address, resourceType, ledgerVersion, network }: UseGetAccountResourceParams = {},  queryOptions: UseGetAccountResourceQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetAccountResourceOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address && resourceType);
  }, [address, resourceType]);

  const queryKey: [string, Partial<GetAccountResourceOperationRequest>] = useMemo(() => {
    return [
      GetAccountResourceOperation.operationId,
      {
        address, resourceType, ledgerVersion, network
      },
    ];
  }, [address, resourceType, ledgerVersion, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address', 'resourceType']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
