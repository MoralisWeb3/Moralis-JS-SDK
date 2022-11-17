import {
  requestChallengeSolanaOperation as operation,
  RequestChallengeSolanaRequest,
  RequestChallengeSolanaResponse,
} from '@moralisweb3/auth';
import { fetcher } from '../../utils/fetcher';
import { SWRConfiguration } from 'swr/dist/types';
import { useCallback } from 'react';
import useSWR from 'swr';

export const useAuthRequestChallengeSolana = (request: RequestChallengeSolanaRequest, SWRConfig?: SWRConfiguration) => {
  const endpoint = 'auth/requestChallengeSolana';

  const { data, error, isValidating, mutate } = useSWR<RequestChallengeSolanaResponse>(
    [endpoint, { operation, request }],
    fetcher,
    {
      revalidateOnMount: request ? true : false,
      revalidateOnFocus: false,
      ...SWRConfig,
    },
  );

  const requestChallengeAsync = useCallback((params: RequestChallengeSolanaRequest) => {
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
