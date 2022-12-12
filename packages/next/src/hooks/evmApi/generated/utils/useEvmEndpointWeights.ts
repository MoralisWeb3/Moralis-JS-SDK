import { 
  endpointWeightsOperation as operation, 
  EndpointWeightsRequest,
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import { useResolver } from '../../../resolvers';

export const useEvmEndpointWeights = (
  request?: EndpointWeightsRequest, 
  fetchParams?: FetchParams,
) => {
  const { data, error, fetch, isFetching } = useResolver({
    endpoint: 'evmApi/endpointWeights',
    operation,
    request,
    fetchParams,
  });

  return {
    data,
    error,
    fetch,
    /**
     * @deprecated use `fetch()` instead
     */
    refetch: () => fetch(),
    isFetching,
    /**
     * @deprecated use `isFetching` instead
     */
    isValidating: isFetching,
  };
};
