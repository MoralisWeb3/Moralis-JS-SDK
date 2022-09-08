import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmWalletTokenBalancesParams, TUseEvmWalletTokenBalancesReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmWalletTokenBalances = (params: TUseEvmWalletTokenBalancesParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmWalletTokenBalancesReturn>(
    [`/moralis/EvmApi/token/getWalletTokenBalances`, params],
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
