import Moralis from 'moralis';
import { GetTokenPriceRequest, GetTokenPriceResponse, getTokenPriceOperation } from 'moralis/common-sol-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseSolTokenPriceParams = UseMoralisQueryParams<GetTokenPriceResponse, GetTokenPriceRequest>

export function useSolTokenPrice({ network,address, ...queryParams }: UseSolTokenPriceParams = {}) {
  const resolver = useOperationResolver(getTokenPriceOperation, Moralis.SolApi.baseUrl);

  const queryKey: [string, GetTokenPriceRequest] | undefined = useMemo(() => {
    if (network &&address ) {
      return [
      getTokenPriceOperation.id,
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