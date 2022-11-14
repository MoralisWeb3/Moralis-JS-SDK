import { getPortfolioOperation, GetPortfolioRequest, GetPortfolioResponse } from '@moralisweb3/common-sol-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useSolPortfolio = (request: GetPortfolioRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, getPortfolioOperation.serializeRequest(request, Moralis.Core));
    return getPortfolioOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<GetPortfolioResponse>('solApi/getPortfolio', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};