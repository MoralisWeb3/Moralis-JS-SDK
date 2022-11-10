import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmWalletTokenBalancesParams, UseEvmWalletTokenBalancesReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmWalletTokenBalances = (params: UseEvmWalletTokenBalancesParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmWalletTokenBalancesReturn>(
    [`EvmApi/token/getWalletTokenBalances`, params],
    axiosFetcher,
    SWRConfig,
  );

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};
