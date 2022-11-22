import {
  requestChallengeSolanaOperation as operation,
  RequestChallengeSolanaRequest,
  RequestChallengeSolanaResponse,
} from '@moralisweb3/auth';
import { fetcher } from '../../utils/fetcher';
import { FetchParams } from '../types';
import { useCallback } from 'react';
import useSWR from 'swr';

export type RequestChallengeSolanaRequestClient = Pick<RequestChallengeSolanaRequest, 'address' | 'network'>;

export const useAuthRequestChallengeSolana = (
  request: RequestChallengeSolanaRequestClient,
  fetchParams?: FetchParams,
) => {
  const endpoint = 'auth/requestChallengeSolana';

  const { data, error, isValidating, mutate } = useSWR<RequestChallengeSolanaResponse>(
    [endpoint, { operation, request }],
    fetcher,
    {
      revalidateOnMount: request ? true : false,
      revalidateOnFocus: false,
      ...fetchParams,
    },
  );

  const requestChallengeAsync = useCallback((params: RequestChallengeSolanaRequestClient) => {
    return mutate(fetcher(endpoint, { operation, request: params }));
  }, []);

  return {
    challenge: data,
    error,
    requestChallengeAsync,
    refetch: async () => mutate(),
    isValidating,
  };
};
