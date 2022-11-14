import { getTokenMetadataOperation, GetTokenMetadataRequest, GetTokenMetadataResponse } from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmTokenMetadata = (request: GetTokenMetadataRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, getTokenMetadataOperation.serializeRequest(request, Moralis.Core));
    return getTokenMetadataOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<GetTokenMetadataResponse>('evmApi/getTokenMetadata', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};