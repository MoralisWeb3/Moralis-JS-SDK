import { fetcher } from '../../../../utils/fetcher';
import { 
  endpointWeightsOperation as operation, 
  EndpointWeightsRequest, 
  EndpointWeightsResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmEndpointWeights = (request: EndpointWeightsRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<EndpointWeightsResponse>(
    ['evmApi/endpointWeights', {operation, request}], 
    fetcher, 
    {revalidateOnFocus: false, ...SWRConfig}
  );

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};
