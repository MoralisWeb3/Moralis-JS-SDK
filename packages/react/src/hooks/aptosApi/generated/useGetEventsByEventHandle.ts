import { GetEventsByEventHandleOperationRequest, AptosGetEventsByEventHandleResponse, GetEventsByEventHandleOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetEventsByEventHandleParams = Partial<GetEventsByEventHandleOperationRequest>;
export type UseGetEventsByEventHandleQueryOptions = QueryOptions<AptosGetEventsByEventHandleResponse[], UseGetEventsByEventHandleParams>;

export function useGetEventsByEventHandle({ address, eventHandle, fieldName, limit, start, network }: UseGetEventsByEventHandleParams = {},  queryOptions: UseGetEventsByEventHandleQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetEventsByEventHandleOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address && eventHandle && fieldName);
  }, [address, eventHandle, fieldName]);

  const queryKey: [string, Partial<GetEventsByEventHandleOperationRequest>] = useMemo(() => {
    return [
      GetEventsByEventHandleOperation.operationId,
      {
        address, eventHandle, fieldName, limit, start, network
      },
    ];
  }, [address, eventHandle, fieldName, limit, start, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address', 'eventHandle', 'fieldName']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
