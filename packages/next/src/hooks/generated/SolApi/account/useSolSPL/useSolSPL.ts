import { SWRConfiguration } from 'swr/dist/types';
import { TUsesolsplParams, TUsesolsplReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useSolSPL = (params: TUsesolsplParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUsesolsplReturn>(
    [`SolApi/account/getSPL`, params],
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
