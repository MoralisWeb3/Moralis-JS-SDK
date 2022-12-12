import { 
  web3ApiVersionOperation as operation, 
  Web3ApiVersionRequest,
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import { useResolver } from '../../../resolvers';

export const useEvmWeb3ApiVersion = (
  request?: Web3ApiVersionRequest, 
  fetchParams?: FetchParams,
) => {
  const { data, error, fetch, isFetching } = useResolver({
    endpoint: 'evmApi/web3ApiVersion',
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
