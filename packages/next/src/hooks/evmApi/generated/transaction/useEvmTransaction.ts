import { 
  getTransactionOperation as operation, 
  GetTransactionRequest,
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import { useResolver } from '../../../resolvers';

export const useEvmTransaction = (
  request?: GetTransactionRequest, 
  fetchParams?: FetchParams,
) => {
  const { data, error, fetch, isFetching } = useResolver({
    endpoint: 'evmApi/getTransaction',
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
