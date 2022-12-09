import { 
  getTokenPriceOperation as operation, 
  GetTokenPriceRequest,
} from 'moralis/common-sol-utils';
import { FetchParams } from '../../../types';
import { useResolver } from '../../../resolvers';

export const useSolTokenPrice = (
  request?: GetTokenPriceRequest, 
  fetchParams?: FetchParams,
) => {
  const { data, error, fetch, isFetching } = useResolver({
    endpoint: 'solApi/getTokenPrice',
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
