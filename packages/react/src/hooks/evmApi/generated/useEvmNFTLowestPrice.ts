import Moralis from 'moralis';
import { GetNFTLowestPriceRequest, GetNFTLowestPriceResponse, getNFTLowestPriceOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useNullableOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmNFTLowestPriceParams = Partial<GetNFTLowestPriceRequest>;
export type UseEvmNFTLowestPriceQueryOptions = QueryOptions<GetNFTLowestPriceResponse | null, UseEvmNFTLowestPriceParams>;

export function useEvmNFTLowestPrice({ address, chain, days, marketplace }: UseEvmNFTLowestPriceParams = {}, queryOptions: UseEvmNFTLowestPriceQueryOptions = {}) {
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
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response?.result || null;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}