import Moralis from 'moralis';
import { GetPairAddressRequest, GetPairAddressResponse, getPairAddressOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseEvmPairAddressParams = UseMoralisQueryParams<GetPairAddressResponse, GetPairAddressRequest>

export function useEvmPairAddress({ token0Address,token1Address,chain,toBlock,toDate,exchange, ...queryParams }: UseEvmPairAddressParams = {}) {
  const resolver = useOperationResolver(getPairAddressOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetPairAddressRequest] | undefined = useMemo(() => {
    if (token0Address &&token1Address ) {
      return [
      getPairAddressOperation.id,
      {
        token0Address,token1Address,chain,toBlock,toDate,exchange
      },
    ];
    }
      return;
  }, [token0Address,token1Address,chain,toBlock,toDate,exchange]);

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