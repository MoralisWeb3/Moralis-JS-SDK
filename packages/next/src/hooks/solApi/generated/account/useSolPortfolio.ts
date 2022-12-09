import { 
  getPortfolioOperation as operation, 
  GetPortfolioRequest,
} from 'moralis/common-sol-utils';
import { FetchParams } from '../../../types';
import { useResolver } from '../../../resolvers';

export const useSolPortfolio = (
  request?: GetPortfolioRequest, 
  fetchParams?: FetchParams,
) => {
  const { data, error, fetch, isFetching } = useResolver({
    endpoint: 'solApi/getPortfolio',
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
