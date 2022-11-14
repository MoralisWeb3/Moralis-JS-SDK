import { getTokenPriceOperation, GetTokenPriceRequest, GetTokenPriceResponse } from '@moralisweb3/common-sol-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useSolTokenPrice = (request: GetTokenPriceRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, getTokenPriceOperation.serializeRequest(request, Moralis.Core));
    return getTokenPriceOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<GetTokenPriceResponse>('solApi/getTokenPrice', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};