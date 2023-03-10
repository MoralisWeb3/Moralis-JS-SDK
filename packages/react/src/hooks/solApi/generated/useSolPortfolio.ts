import Moralis from 'moralis';
import { GetPortfolioRequest, GetPortfolioResponse, getPortfolioOperation } from 'moralis/common-sol-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseSolPortfolioParams = UseMoralisQueryParams<GetPortfolioResponse, GetPortfolioRequest>

export function useSolPortfolio({ network,address, ...queryParams }: UseSolPortfolioParams = {}) {
  const resolver = useOperationResolver(getPortfolioOperation, Moralis.SolApi.baseUrl);

  const queryKey: [string, GetPortfolioRequest] | undefined = useMemo(() => {
    if (network &&address ) {
      return [
      getPortfolioOperation.id,
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