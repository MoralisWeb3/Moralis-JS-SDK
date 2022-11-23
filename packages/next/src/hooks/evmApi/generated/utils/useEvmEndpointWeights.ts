import { fetcher } from '../../../../utils/fetcher';
import { 
  endpointWeightsOperation as operation, 
  EndpointWeightsRequest, 
  EndpointWeightsResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmEndpointWeights = (request: EndpointWeightsRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<EndpointWeightsResponse>(
    ['evmApi/endpointWeights', {operation, request}], 
    fetcher, 
    {revalidateOnFocus: false, ...fetchParams}
  );

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};
