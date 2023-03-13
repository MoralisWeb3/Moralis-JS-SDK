import Moralis from 'moralis';
import { GetPairAddressRequest, GetPairAddressResponse, getPairAddressOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmPairAddressParams = UseMoralisQueryParams<GetPairAddressResponse, Partial<GetPairAddressRequest>>

export function useEvmPairAddress({ token0Address, token1Address, chain, toBlock, toDate, exchange, ...queryParams }: UseEvmPairAddressParams = {}) {
  const resolver = useOperationResolver(getPairAddressOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(token0Address && token1Address && exchange);
  }, [token0Address , token1Address , exchange]);

  const queryKey: [string, Partial<GetPairAddressRequest>] = useMemo(() => {
    return [
      getPairAddressOperation.id,
      {
        token0Address, token1Address, chain, toBlock, toDate, exchange
      },
    ];
  }, [token0Address, token1Address, chain, toBlock, toDate, exchange]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['token0Address', 'token1Address', 'exchange']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}