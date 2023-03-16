import Moralis from 'moralis';
import { GetSPLRequest, GetSPLResponse, getSPLOperation } from 'moralis/common-sol-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseSolSPLParams = Partial<GetSPLRequest>;
export type UseSolSPLQueryOptions = QueryOptions<GetSPLResponse, UseSolSPLParams>;

export function useSolSPL({ network, address }: UseSolSPLParams = {}, queryOptions: UseSolSPLQueryOptions = {}) {
  const resolver = useOperationResolver(getSPLOperation, Moralis.SolApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetSPLRequest>] = useMemo(() => {
    return [
      getSPLOperation.id,
      {
        network, address
      },
    ];
  }, [network, address]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}