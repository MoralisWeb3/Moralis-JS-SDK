import { SWRConfiguration } from 'swr/dist/types';
import { UseSolBalanceParams, UseSolBalanceReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useSolBalance = (params: UseSolBalanceParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseSolBalanceReturn>(
    [`SolApi/account/getBalance`, params],
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
