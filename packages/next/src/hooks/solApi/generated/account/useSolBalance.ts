import { 
  getBalanceOperation as operation, 
  GetBalanceRequest,
} from 'moralis/common-sol-utils';
import { FetchParams } from '../../../types';
import { useResolver } from '../../../resolvers';

export const useSolBalance = (
  request?: GetBalanceRequest, 
  fetchParams?: FetchParams,
) => {
  const { data, error, fetch, isFetching } = useResolver({
    endpoint: 'solApi/getBalance',
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
