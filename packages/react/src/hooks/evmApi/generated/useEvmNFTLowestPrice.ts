import Moralis from 'moralis';
import { GetNFTLowestPriceRequest, GetNFTLowestPriceResponse, getNFTLowestPriceOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmNFTLowestPriceParams = UseMoralisQueryParams<GetNFTLowestPriceResponse| null, Partial<GetNFTLowestPriceRequest>>

export function useEvmNFTLowestPrice({ address, chain, days, marketplace, ...queryParams }: UseEvmNFTLowestPriceParams = {}) {
  const resolver = useNullableOperationResolver(getNFTLowestPriceOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetNFTLowestPriceRequest>] = useMemo(() => {
    return [
      getNFTLowestPriceOperation.id,
      {
        address, chain, days, marketplace
      },
    ];
  }, [address, chain, days, marketplace]);

  return useQuery({
    ...queryParams,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response?.result || null;
    },
    enabled: hasRequiredParams && queryParams.enabled,
  });
}