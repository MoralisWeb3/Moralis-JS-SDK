import Moralis from 'moralis';
import { GetBalanceRequest, GetBalanceResponse, getBalanceOperation } from 'moralis/common-sol-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseSolBalanceParams = UseMoralisQueryParams<GetBalanceResponse, GetBalanceRequest>

export function useSolBalance({ network,address, ...queryParams }: UseSolBalanceParams = {}) {
  const resolver = useOperationResolver(getBalanceOperation, Moralis.SolApi.baseUrl);

  const queryKey: [string, GetBalanceRequest] | undefined = useMemo(() => {
    if (network &&address ) {
      return [
      getBalanceOperation.id,
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