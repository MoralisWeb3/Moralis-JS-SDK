import { SWRConfiguration } from 'swr/dist/types';
import { TUseSolNFTsParams, TUseSolNFTsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useSolNFTs = (params: TUseSolNFTsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseSolNFTsReturn>(
    [`/moralis/SolApi/account/getNFTs`, params],
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
