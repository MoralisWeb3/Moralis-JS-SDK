import Moralis from 'moralis';
import { GetSPLRequest, GetSPLResponse, getSPLOperation } from 'moralis/common-sol-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseSolSPLParams = UseMoralisQueryParams<GetSPLResponse, GetSPLRequest>

export function useSolSPL({ network,address, ...queryParams }: UseSolSPLParams = {}) {
  const resolver = useOperationResolver(getSPLOperation, Moralis.SolApi.baseUrl);

  const queryKey: [string, GetSPLRequest] | undefined = useMemo(() => {
    if (network &&address ) {
      return [
      getSPLOperation.id,
      {
        network,address
      },
    ];
    }
      return;
  }, [network,address]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const { result } = await resolver.fetch(request);
      return result;
    },
    ...queryParams,
    enabled: queryKey && queryParams.enabled,
  });
}