import Moralis from 'moralis';
import { GetTokenPriceRequest, GetTokenPriceResponse, getTokenPriceOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseEvmTokenPriceParams = UseMoralisQueryParams<GetTokenPriceResponse, GetTokenPriceRequest>

export function useEvmTokenPrice({ address,chain,exchange,toBlock, ...queryParams }: UseEvmTokenPriceParams = {}) {
  const resolver = useOperationResolver(getTokenPriceOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetTokenPriceRequest] | undefined = useMemo(() => {
    if (address ) {
      return [
      getTokenPriceOperation.id,
      {
        address,chain,exchange,toBlock
      },
    ];
    }
      return;
  }, [address,chain,exchange,toBlock]);

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