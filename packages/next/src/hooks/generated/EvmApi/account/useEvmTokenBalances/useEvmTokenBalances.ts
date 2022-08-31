import { SWRConfiguration } from 'swr/dist/types';
import { TGetTokenBalancesParams, TGetTokenBalancesReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmTokenBalances = (params: TGetTokenBalancesParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetTokenBalancesReturn['result']>(
    [`/moralis/EvmApi/account/getTokenBalances`, params],
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
