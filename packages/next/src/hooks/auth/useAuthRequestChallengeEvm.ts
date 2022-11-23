import {
  requestChallengeEvmOperation as operation,
  RequestChallengeEvmRequest,
  RequestChallengeEvmResponse,
} from '@moralisweb3/auth';
import { fetcher } from '../../utils/fetcher';
import { FetchParams } from '../types';
import { useCallback } from 'react';
import useSWR from 'swr';

export type RequestChallengeEvmRequestClient = Pick<RequestChallengeEvmRequest, 'chainId' | 'address'>;

export const useAuthRequestChallengeEvm = (request?: RequestChallengeEvmRequestClient, fetchParams?: FetchParams) => {
  const endpoint = 'auth/requestChallengeEvm';

  const { data, error, isValidating, mutate } = useSWR<RequestChallengeEvmResponse>(
    [endpoint, { operation, request }],
    fetcher,
    {
      revalidateOnMount: request ? true : false,
      revalidateOnFocus: false,
      ...fetchParams,
    },
  );

  const requestChallengeAsync = useCallback((params: RequestChallengeEvmRequestClient) => {
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
