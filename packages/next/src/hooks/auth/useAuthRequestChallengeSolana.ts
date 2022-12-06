import {
  requestChallengeSolanaOperation as operation,
  RequestChallengeSolanaRequest,
  RequestChallengeSolanaResponse,
} from '@moralisweb3/common-auth-utils';
import { fetcher } from '../../utils/fetcher';
import { FetchParams } from '../types';
import { useCallback } from 'react';
import useSWR from 'swr';

export type RequestChallengeSolanaRequestClient = Pick<RequestChallengeSolanaRequest, 'address' | 'network'>;

export const useAuthRequestChallengeSolana = (
  request?: RequestChallengeSolanaRequestClient,
  fetchParams?: FetchParams,
) => {
  const endpoint = 'auth/requestChallengeSolana';
  const { deserializeResponse } = operation;

  const { data, error, isValidating, mutate } = useSWR<RequestChallengeSolanaResponse>(
    [
      endpoint,
      {
        deserializeResponse,
        request,
      },
    ],
    request ? fetcher : null,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      ...fetchParams,
    },
  );

  const requestChallengeAsync = useCallback((params: RequestChallengeSolanaRequestClient) => {
    return mutate(
      fetcher(endpoint, {
        deserializeResponse,
        request: params,
      }),
    );
  }, []);

  return {
    challenge: data,
    error,
    requestChallengeAsync,
    refetch: async () => mutate(),
    isValidating,
  };
};
