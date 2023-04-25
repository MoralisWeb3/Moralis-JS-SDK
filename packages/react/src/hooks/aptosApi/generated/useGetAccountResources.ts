import { GetAccountResourcesOperationRequest, AptosGetAccountResourceResponse, GetAccountResourcesOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetAccountResourcesParams = Partial<GetAccountResourcesOperationRequest>;
export type UseGetAccountResourcesQueryOptions = QueryOptions<AptosGetAccountResourceResponse[], UseGetAccountResourcesParams>;

export function useGetAccountResources({ address, ledgerVersion, limit, start, network }: UseGetAccountResourcesParams = {},  queryOptions: UseGetAccountResourcesQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetAccountResourcesOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetAccountResourcesOperationRequest>] = useMemo(() => {
    return [
      GetAccountResourcesOperation.operationId,
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
