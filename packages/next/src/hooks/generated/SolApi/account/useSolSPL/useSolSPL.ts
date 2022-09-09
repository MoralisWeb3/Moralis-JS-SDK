import { SWRConfiguration } from 'swr/dist/types';
import { TUseSolSplParams, TUseSolSplReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useSolSPL = (params: TUseSolSplParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseSolSplReturn>(
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
