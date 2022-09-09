import { SWRConfiguration } from 'swr/dist/types';
import { TUseSolSplParams, TUseSolSplReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useSolSPL = (params: TUseSolSplParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

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
