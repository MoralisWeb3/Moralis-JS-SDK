import Moralis from 'moralis';
import { GetNFTLowestPriceRequest, GetNFTLowestPriceResponse, getNFTLowestPriceOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';

export type UseEvmNFTLowestPriceParams = UseMoralisQueryParams<GetNFTLowestPriceResponse, GetNFTLowestPriceRequest>

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
      const { result } = await resolver.fetch(request);
      return result;
    },
    ...queryParams,
    enabled: queryKey && queryParams.enabled,
  });
}