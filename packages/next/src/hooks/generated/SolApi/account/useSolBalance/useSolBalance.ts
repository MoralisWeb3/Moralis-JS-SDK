import { SWRConfiguration } from 'swr/dist/types';
import { TUsesolbalanceParams, TUsesolbalanceReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useSolBalance = (params: TUsesolbalanceParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUsesolbalanceReturn>(
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
