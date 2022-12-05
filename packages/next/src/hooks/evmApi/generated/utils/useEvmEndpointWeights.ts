import { fetcher, NoHookParamsError } from '../../../../utils';
import { 
  endpointWeightsOperation as operation, 
  EndpointWeightsRequest, 
  EndpointWeightsResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import { useCallback } from 'react';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmEndpointWeights = (
  request?: EndpointWeightsRequest, 
  { revalidateOnMount = true, ...fetchParams }: FetchParams = {},
) => {
  const endpoint = 'evmApi/endpointWeights';
  const { deserializeResponse, serializeRequest } = operation;

  const { data, error, mutate, isValidating } = useSWR<EndpointWeightsResponse>(
    [endpoint, request ? { deserializeResponse, request: serializeRequest(request, Moralis.Core) } : null], 
    fetcher, 
    { revalidateOnFocus: false, revalidateOnMount, ...fetchParams }
  );

  const fetch = useCallback((params?: EndpointWeightsRequest) => {
    const fetchRequest = params ?? request;
    if (!fetchRequest) {
      throw new NoHookParamsError('useEvmNativeBalance');
    }
    return mutate(
      fetcher(endpoint, {
        deserializeResponse,
        request: params ?? request,
      }),
    );
  }, []);

  return {
    data,
    error,
    fetch,
    /**
     * @deprecated use `fetch()` instead
     */
    refetch: () => fetch(),
    isFetching: isValidating,
    /**
     * @deprecated use `isFetching` instead
     */
    isValidating,
  };
};
