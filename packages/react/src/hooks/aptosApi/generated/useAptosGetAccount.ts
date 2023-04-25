import { GetAccountOperationRequest, AptosGetAccountResponse, GetAccountOperation, OperationV3 } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetAccountParams = Partial<GetAccountOperationRequest>;
export type UseGetAccountQueryOptions = QueryOptions<AptosGetAccountResponse, UseGetAccountParams>;



function useOperationV3Query<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>(operation: OperationV3<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>, request: Request, body?: any) {
  const resolver = useOperationV3Resolver(operation);
  const queryKey = useQueryKey(operation.operationId, request);

  const hasRequiredParams = useMemo(() => {
    return Boolean(body);
  }, [body]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['body']);
      return resolver.resolve(params, body);
    },
    enabled: hasRequiredParams,
  });
}
  

export function useGetAccount({ address, ledgerVersion, network }: UseGetAccountParams = {}, queryOptions: UseGetAccountQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetAccountOperation);
  const queryKey = useQueryKey(GetAccountOperation.operationId, { address, ledgerVersion, network })

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

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
