import { fetcher } from '../../../../utils/fetcher';
import { 
  endpointWeightsOperation as operation, 
  EndpointWeightsRequest, 
  EndpointWeightsResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmEndpointWeights = (request: EndpointWeightsRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<EndpointWeightsResponse>(
    ['evmApi/endpointWeights', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
