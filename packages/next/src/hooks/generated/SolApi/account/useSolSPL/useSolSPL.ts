import { SWRConfiguration } from 'swr/dist/types';
import { UseSolSplParams, UseSolSplReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useSolSPL = (params: UseSolSplParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseSolSplReturn>(
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
