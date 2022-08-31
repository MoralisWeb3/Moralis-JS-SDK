import { SWRConfiguration } from 'swr/dist/types';
import { TSearchNFTsParams, TSearchNFTsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmSearchNFTs = (params: TSearchNFTsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TSearchNFTsReturn['result']>(
    [`/moralis/EvmApi/token/searchNFTs`, params],
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
