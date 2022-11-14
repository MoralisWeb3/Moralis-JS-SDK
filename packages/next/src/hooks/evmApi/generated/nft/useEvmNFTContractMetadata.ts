import { getNFTContractMetadataOperation, GetNFTContractMetadataRequest, GetNFTContractMetadataResponse } from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmNFTContractMetadata = (request: GetNFTContractMetadataRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, getNFTContractMetadataOperation.serializeRequest(request, Moralis.Core));
    return getNFTContractMetadataOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<GetNFTContractMetadataResponse>('evmApi/getNFTContractMetadata', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};