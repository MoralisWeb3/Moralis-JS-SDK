import Moralis from 'moralis';
import { GetPortfolioRequest, GetPortfolioResponse, getPortfolioOperation } from 'moralis/common-sol-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseSolPortfolioParams = UseMoralisQueryParams<GetPortfolioResponse, GetPortfolioRequest>

export function useSolPortfolio({ network, address, ...queryParams }: UseSolPortfolioParams = {}) {
  const resolver = useOperationResolver(getPortfolioOperation, Moralis.SolApi.baseUrl);

  const queryKey: [string, GetPortfolioRequest] | undefined = useMemo(() => {
      return [
      getPortfolioOperation.id,
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