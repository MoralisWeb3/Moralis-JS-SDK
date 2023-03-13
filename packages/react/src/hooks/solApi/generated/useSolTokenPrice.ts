import Moralis from 'moralis';
import { GetTokenPriceRequest, GetTokenPriceResponse, getTokenPriceOperation } from 'moralis/common-sol-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseSolTokenPriceParams = UseMoralisQueryParams<GetTokenPriceResponse, Partial<GetTokenPriceRequest>>

export function useSolTokenPrice({ network, address, ...queryParams }: UseSolTokenPriceParams = {}) {
  const resolver = useOperationResolver(getTokenPriceOperation, Moralis.SolApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetTokenPriceRequest>] = useMemo(() => {
    return [
      getTokenPriceOperation.id,
      {
        network, address
      },
    ];
  }, [network, address]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}