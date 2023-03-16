import Moralis from 'moralis';
import { GetPortfolioRequest, GetPortfolioResponse, getPortfolioOperation } from 'moralis/common-sol-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseSolPortfolioParams = Partial<GetPortfolioRequest>;
export type UseSolPortfolioQueryOptions = QueryOptions<GetPortfolioResponse, UseSolPortfolioParams>;

export function useSolPortfolio({ network, address }: UseSolPortfolioParams = {}, queryOptions: UseSolPortfolioQueryOptions = {}) {
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