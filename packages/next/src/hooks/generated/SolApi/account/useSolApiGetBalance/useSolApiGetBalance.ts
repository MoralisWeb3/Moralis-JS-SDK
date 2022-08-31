import { SWRConfiguration } from 'swr/dist/types';
import { TGetBalanceParams, TGetBalanceReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useSolApiGetBalance = (params: TGetBalanceParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetBalanceReturn['result']>(
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
