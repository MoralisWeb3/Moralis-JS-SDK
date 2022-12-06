import {
  getNativeBalanceOperation as operation,
  GetNativeBalanceRequest,
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import { useResolver } from '../../../resolvers';

export const useEvmNativeBalance = (request?: GetNativeBalanceRequest, fetchParams?: FetchParams) => {
  const { data, error, fetch, isFetching } = useResolver({
    endpoint: 'evmApi/getNativeBalance',
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
