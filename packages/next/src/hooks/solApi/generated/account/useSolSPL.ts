import { 
  getSPLOperation as operation, 
  GetSPLRequest,
} from 'moralis/common-sol-utils';
import { FetchParams } from '../../../types';
import { useResolver } from '../../../resolvers';

export const useSolSPL = (
  request?: GetSPLRequest, 
  fetchParams?: FetchParams,
) => {
  const { data, error, fetch, isFetching } = useResolver({
    endpoint: 'solApi/getSPL',
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
