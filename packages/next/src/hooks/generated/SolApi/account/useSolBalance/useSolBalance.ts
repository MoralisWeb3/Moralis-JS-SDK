import { SWRConfiguration } from 'swr/dist/types';
import { TUseSolBalanceParams, TUseSolBalanceReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useSolBalance = (params: TUseSolBalanceParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseSolBalanceReturn>(
    [`/moralis/SolApi/account/getBalance`, params],
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
