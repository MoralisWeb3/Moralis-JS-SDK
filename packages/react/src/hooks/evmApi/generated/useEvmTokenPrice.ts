import Moralis from 'moralis';
import { GetTokenPriceRequest, GetTokenPriceResponse, getTokenPriceOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmTokenPriceParams = Partial<GetTokenPriceRequest>;
export type UseEvmTokenPriceQueryOptions = QueryOptions<GetTokenPriceResponse, UseEvmTokenPriceParams>;

export function useEvmTokenPrice({ address, chain, exchange, toBlock }: UseEvmTokenPriceParams = {}, queryOptions: UseEvmTokenPriceQueryOptions = {}) {
  const resolver = useOperationResolver(getTokenPriceOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetTokenPriceRequest>] = useMemo(() => {
    return [
      getTokenPriceOperation.id,
      {
        address, chain, exchange, toBlock
      },
    ];
  }, [address, chain, exchange, toBlock]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}