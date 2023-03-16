import Moralis from 'moralis';
import { EndpointWeightsRequest, EndpointWeightsResponse, endpointWeightsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';


export type UseEvmEndpointWeightsParams = EndpointWeightsRequest;
export type UseEvmEndpointWeightsQueryOptions = QueryOptions<EndpointWeightsResponse, UseEvmEndpointWeightsParams>;

export function useEvmEndpointWeights(queryOptions: UseEvmEndpointWeightsQueryOptions = {}) {
  const resolver = useOperationResolver(endpointWeightsOperation, Moralis.EvmApi.baseUrl);


  const queryKey: [string, EndpointWeightsRequest] = useMemo(() => {
    return [
      endpointWeightsOperation.id,
      {
        
      },
    ];
  }, []);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const response = await resolver.fetch(request);
      return response.result;
    },
    enabled: queryOptions.enabled,
  });
}