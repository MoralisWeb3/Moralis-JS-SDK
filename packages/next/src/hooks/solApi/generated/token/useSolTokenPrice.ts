import { getTokenPriceOperation, GetTokenPriceRequest } from '@moralisweb3/common-sol-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useSolTokenPrice = (request: GetTokenPriceRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, fetcherParams);
    return getTokenPriceOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR(['solApi/getTokenPrice', getTokenPriceOperation.serializeRequest(request, Moralis.Core)], axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};