import { getWalletTransactionsOperation, GetWalletTransactionsRequest, GetWalletTransactionsResponse } from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmWalletTransactions = (request: GetWalletTransactionsRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, getWalletTransactionsOperation.serializeRequest(request, Moralis.Core));
    return getWalletTransactionsOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<GetWalletTransactionsResponse>('evmApi/getWalletTransactions', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};