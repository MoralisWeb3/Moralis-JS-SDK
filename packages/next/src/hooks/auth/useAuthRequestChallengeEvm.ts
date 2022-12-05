import {
  requestChallengeEvmOperation as operation,
  RequestChallengeEvmRequest,
  RequestChallengeEvmResponse,
} from '@moralisweb3/common-auth-utils';
import { fetcher } from '../../utils/fetcher';
import { FetchParams } from '../types';
import { useCallback } from 'react';
import useSWR from 'swr';

export type RequestChallengeEvmRequestClient = Pick<RequestChallengeEvmRequest, 'chainId' | 'address'>;

export const useAuthRequestChallengeEvm = (request?: RequestChallengeEvmRequestClient, fetchParams?: FetchParams) => {
  const endpoint = 'auth/requestChallengeEvm';
  const { deserializeResponse } = operation;

  const { data, error, isValidating, mutate } = useSWR<RequestChallengeEvmResponse>(
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

  const requestChallengeAsync = useCallback((params: RequestChallengeEvmRequestClient) => {
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
