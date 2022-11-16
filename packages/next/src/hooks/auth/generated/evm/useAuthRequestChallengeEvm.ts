import { requestChallengeEvmOperation, RequestChallengeEvmRequest, RequestChallengeEvmResponse } from '@moralisweb3/auth';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useAuthRequestChallengeEvm = (request: RequestChallengeEvmRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, requestChallengeEvmOperation.serializeRequest(request, Moralis.Core));
    return requestChallengeEvmOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<RequestChallengeEvmResponse>('auth/requestChallengeEvm', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};