import {
  requestChallengeSolanaOperation,
  RequestChallengeSolanaRequest,
  RequestChallengeSolanaResponse,
} from '@moralisweb3/auth';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useAuthRequestChallengeSolana = (request: RequestChallengeSolanaRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(
      `/api/moralis/${endpoint}`,
      requestChallengeSolanaOperation.serializeRequest(request, Moralis.Core),
    );
    return requestChallengeSolanaOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<RequestChallengeSolanaResponse>(
    'auth/requestChallengeSolana',
    axiosFetcher,
    SWRConfig,
  );

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};
