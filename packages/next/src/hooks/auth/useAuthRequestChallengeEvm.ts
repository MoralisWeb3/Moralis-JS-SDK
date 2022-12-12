import { requestChallengeEvmOperation as operation, RequestChallengeEvmRequest } from '@moralisweb3/common-auth-utils';
import { FetchParams } from '../types';
import { useResolver } from '../resolvers';

export type RequestChallengeEvmRequestClient = Pick<RequestChallengeEvmRequest, 'chainId' | 'address'>;

export const useAuthRequestChallengeEvm = (request?: RequestChallengeEvmRequestClient, fetchParams?: FetchParams) => {
  const { data, error, fetch, isFetching } = useResolver({
    endpoint: 'auth/requestChallengeEvm',
    operation,
    request,
    fetchParams,
  });

  return {
    challenge: data,
    error,
    requestChallengeAsync: fetch,
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
