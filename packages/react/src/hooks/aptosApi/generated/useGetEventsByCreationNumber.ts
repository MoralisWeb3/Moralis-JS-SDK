import { GetEventsByCreationNumberOperationRequest, AptosGetEventsByCreationNumberResponse, GetEventsByCreationNumberOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetEventsByCreationNumberParams = Partial<GetEventsByCreationNumberOperationRequest>;
export type UseGetEventsByCreationNumberQueryOptions = QueryOptions<AptosGetEventsByCreationNumberResponse[], UseGetEventsByCreationNumberParams>;

export function useGetEventsByCreationNumber({ address, creationNumber, limit, start, network }: UseGetEventsByCreationNumberParams = {},  queryOptions: UseGetEventsByCreationNumberQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetEventsByCreationNumberOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address && creationNumber);
  }, [address, creationNumber]);

  const queryKey: [string, Partial<GetEventsByCreationNumberOperationRequest>] = useMemo(() => {
    return [
      GetEventsByCreationNumberOperation.operationId,
      {
        address, creationNumber, limit, start, network
      },
    ];
  }, [address, creationNumber, limit, start, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address', 'creationNumber']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
