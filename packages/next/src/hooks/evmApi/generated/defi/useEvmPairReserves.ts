import { 
  getPairReservesOperation as operation, 
  GetPairReservesRequest,
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import { useResolver } from '../../../resolvers';

export const useEvmPairReserves = (
  request?: GetPairReservesRequest, 
  fetchParams?: FetchParams,
) => {
  const { data, error, fetch, isFetching } = useResolver({
    endpoint: 'evmApi/getPairReserves',
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
