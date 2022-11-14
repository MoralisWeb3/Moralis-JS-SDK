import { getNFTMetadataOperation, GetNFTMetadataRequest, GetNFTMetadataResponse } from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmNFTMetadata = (request: GetNFTMetadataRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, getNFTMetadataOperation.serializeRequest(request, Moralis.Core));
    return getNFTMetadataOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<GetNFTMetadataResponse>('evmApi/getNFTMetadata', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};