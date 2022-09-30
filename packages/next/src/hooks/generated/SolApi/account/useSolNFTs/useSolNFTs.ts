import { SWRConfiguration } from 'swr/dist/types';
import { UseSolNfTsParams, UseSolNfTsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useSolNFTs = (params: UseSolNfTsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseSolNfTsReturn>(
    [`SolApi/account/getNFTs`, params],
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
