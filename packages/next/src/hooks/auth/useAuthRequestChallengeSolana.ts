import {
  requestChallengeSolanaOperation as operation,
  RequestChallengeSolanaRequest,
} from '@moralisweb3/common-auth-utils';
import { FetchParams } from '../types';
import { useResolver } from '../resolvers';

export type RequestChallengeSolanaRequestClient = Pick<RequestChallengeSolanaRequest, 'address' | 'network'>;

export const useAuthRequestChallengeSolana = (
  request?: RequestChallengeSolanaRequestClient,
  fetchParams?: FetchParams,
) => {
  const { data, error, fetch, isFetching } = useResolver({
    endpoint: 'auth/requestChallengeSolana',
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
