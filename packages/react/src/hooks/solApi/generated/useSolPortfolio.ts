import Moralis from 'moralis';
import { GetPortfolioRequest, GetPortfolioResponse, getPortfolioOperation } from 'moralis/common-sol-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseSolPortfolioParams = UseMoralisQueryParams<GetPortfolioResponse, Partial<GetPortfolioRequest>>

export function useSolPortfolio({ network, address, ...queryParams }: UseSolPortfolioParams = {}) {
  const resolver = useOperationResolver(getPortfolioOperation, Moralis.SolApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetPortfolioRequest>] = useMemo(() => {
    return [
      getPortfolioOperation.id,
      {
        network, address
      },
    ];
  }, [network, address]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}