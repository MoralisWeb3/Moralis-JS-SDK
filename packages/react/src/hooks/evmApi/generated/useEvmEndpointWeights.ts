import Moralis from 'moralis';
import { EndpointWeightsRequest, EndpointWeightsResponse, endpointWeightsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseEvmEndpointWeightsParams = UseMoralisQueryParams<EndpointWeightsResponse, EndpointWeightsRequest>

export function useEvmEndpointWeights({ ...queryParams }: UseEvmEndpointWeightsParams = {}) {
  const resolver = useOperationResolver(endpointWeightsOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, EndpointWeightsRequest] | undefined = useMemo(() => {
      return [
      endpointWeightsOperation.id,
        {
          
        },
      ]
  }, []);

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