import Moralis from 'moralis';
import { GetBalanceRequest, GetBalanceResponse, getBalanceOperation } from 'moralis/common-sol-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseSolBalanceParams = UseMoralisQueryParams<GetBalanceResponse, GetBalanceRequest>

export function useSolBalance({ network, address, ...queryParams }: UseSolBalanceParams = {}) {
  const resolver = useOperationResolver(getBalanceOperation, Moralis.SolApi.baseUrl);

  const queryKey: [string, GetBalanceRequest] | undefined = useMemo(() => {
      return [
      getBalanceOperation.id,
        {
          network, address
        },
      ]
  }, [network, address]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const response = await resolver.fetch(request);
      return response.result;
    },
    ...queryParams,
    enabled: queryKey && queryParams.enabled,
  });
}