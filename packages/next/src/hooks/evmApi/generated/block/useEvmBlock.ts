import { 
  getBlockOperation as operation, 
  GetBlockRequest,
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import { useResolver } from '../../../resolvers';

export const useEvmBlock = (
  request?: GetBlockRequest, 
  fetchParams?: FetchParams,
) => {
  const { data, error, fetch, isFetching } = useResolver({
    endpoint: 'evmApi/getBlock',
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
