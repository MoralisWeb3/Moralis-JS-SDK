import { getNFTLowestPriceOperation, GetNFTLowestPriceRequest, GetNFTLowestPriceResponse } from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmNFTLowestPrice = (request: GetNFTLowestPriceRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, getNFTLowestPriceOperation.serializeRequest(request, Moralis.Core));
    return getNFTLowestPriceOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<GetNFTLowestPriceResponse>('evmApi/getNFTLowestPrice', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};