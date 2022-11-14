import { getBalanceOperation, GetBalanceRequest, GetBalanceResponse } from '@moralisweb3/common-sol-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useSolBalance = (request: GetBalanceRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, getBalanceOperation.serializeRequest(request, Moralis.Core));
    return getBalanceOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<GetBalanceResponse>('solApi/getBalance', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};