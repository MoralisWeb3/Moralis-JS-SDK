import Moralis from 'moralis';
import { GetNFTLowestPriceRequest, GetNFTLowestPriceResponse, getNFTLowestPriceOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';

export type UseEvmNFTLowestPriceParams = UseMoralisQueryParams<GetNFTLowestPriceResponse| null, GetNFTLowestPriceRequest>

export function useEvmNFTLowestPrice({ address,chain,days,marketplace, ...queryParams }: UseEvmNFTLowestPriceParams = {}) {
  const resolver = useNullableOperationResolver(getNFTLowestPriceOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetNFTLowestPriceRequest] | undefined = useMemo(() => {
    if (address ) {
      return [
      getNFTLowestPriceOperation.id,
      {
        address,chain,days,marketplace
      },
    ];
    }
      return;
  }, [address,chain,days,marketplace]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const response = await resolver.fetch(request);
      return response?.result || null;
    },
    ...queryParams,
    enabled: queryKey && queryParams.enabled,
  });
}