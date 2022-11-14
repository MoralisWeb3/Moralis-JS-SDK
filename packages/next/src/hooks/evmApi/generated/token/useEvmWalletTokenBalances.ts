import { getWalletTokenBalancesOperation, GetWalletTokenBalancesRequest, GetWalletTokenBalancesResponse } from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmWalletTokenBalances = (request: GetWalletTokenBalancesRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, getWalletTokenBalancesOperation.serializeRequest(request, Moralis.Core));
    return getWalletTokenBalancesOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<GetWalletTokenBalancesResponse>('evmApi/getWalletTokenBalances', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};