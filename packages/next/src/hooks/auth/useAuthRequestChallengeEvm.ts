import {
  requestChallengeEvmOperation as operation,
  RequestChallengeEvmRequest,
  RequestChallengeEvmResponse,
} from '@moralisweb3/auth';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';
import { useCallback } from 'react';
import { fetcher } from '../../utils/fetcher';

export const useAuthRequestChallengeEvm = (request?: RequestChallengeEvmRequest, SWRConfig?: SWRConfiguration) => {
  const endpoint = 'auth/requestChallengeEvm';

  const { data, error, isValidating, mutate } = useSWR<RequestChallengeEvmResponse>(
    [endpoint, { operation, request }],
    fetcher,
    {
      revalidateOnMount: request ? true : false,
      revalidateOnFocus: false,
      ...SWRConfig,
    },
  );

  const requestChallengeAsync = useCallback((params: RequestChallengeEvmRequest) => {
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
