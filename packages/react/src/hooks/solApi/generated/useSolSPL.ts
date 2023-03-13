import Moralis from 'moralis';
import { GetSPLRequest, GetSPLResponse, getSPLOperation } from 'moralis/common-sol-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseSolSPLParams = UseMoralisQueryParams<GetSPLResponse, Partial<GetSPLRequest>>

export function useSolSPL({ network, address, ...queryParams }: UseSolSPLParams = {}) {
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
    ...queryParams,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryParams.enabled,
  });
}