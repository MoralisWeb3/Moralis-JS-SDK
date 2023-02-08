import {
  requestChallengeAptosOperation as operation,
  RequestChallengeAptosRequest,
} from '@moralisweb3/common-auth-utils';
import { FetchParams } from '../types';
import { useResolver } from '../resolvers';

export type RequestChallengeAptosRequestClient = Pick<RequestChallengeAptosRequest, 'address' | 'chainId'>;

export const useAuthRequestChallengeAptos = (
  request?: RequestChallengeAptosRequestClient,
  fetchParams?: FetchParams,
) => {
  const { data, error, fetch, isFetching } = useResolver({
    endpoint: 'auth/requestChallengeAptos',
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
