import Moralis from 'moralis';
import { GetTokenPriceRequest, GetTokenPriceResponse, getTokenPriceOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmTokenPriceParams = UseMoralisQueryParams<GetTokenPriceResponse, Partial<GetTokenPriceRequest>>

export function useEvmTokenPrice({ address, chain, exchange, toBlock, ...queryParams }: UseEvmTokenPriceParams = {}) {
  const resolver = useOperationResolver(getTokenPriceOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address && address);
  }, [address , address]);

  const queryKey: [string, Partial<GetTokenPriceRequest>] = useMemo(() => {
    return [
      getTokenPriceOperation.id,
      {
        address, chain, exchange, toBlock
      },
    ];
  }, [address, chain, exchange, toBlock]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address' , 'address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}