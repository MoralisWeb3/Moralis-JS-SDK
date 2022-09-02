import { SWRConfiguration } from 'swr/dist/types';
import { TUseSolSPLParams, TUseSolSPLReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useSolSPL = (params: TUseSolSPLParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseSolSPLReturn>(
    [`/moralis/SolApi/account/getSPL`, params],
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
