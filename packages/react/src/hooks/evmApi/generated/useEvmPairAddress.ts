import Moralis from 'moralis';
import { GetPairAddressRequest, GetPairAddressResponse, getPairAddressOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmPairAddressParams = Partial<GetPairAddressRequest>;
export type UseEvmPairAddressQueryOptions = QueryOptions<GetPairAddressResponse, UseEvmPairAddressParams>;

export function useEvmPairAddress({ token0Address, token1Address, chain, toBlock, toDate, exchange }: UseEvmPairAddressParams = {}, queryOptions: UseEvmPairAddressQueryOptions = {}) {
  const resolver = useOperationResolver(getPairAddressOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(token0Address && token1Address && exchange);
  }, [token0Address, token1Address, exchange]);

  const queryKey: [string, Partial<GetPairAddressRequest>] = useMemo(() => {
    return [
      getPairAddressOperation.id,
      {
        token0Address, token1Address, chain, toBlock, toDate, exchange
      },
    ];
  }, [token0Address, token1Address, chain, toBlock, toDate, exchange]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['token0Address', 'token1Address', 'exchange']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}