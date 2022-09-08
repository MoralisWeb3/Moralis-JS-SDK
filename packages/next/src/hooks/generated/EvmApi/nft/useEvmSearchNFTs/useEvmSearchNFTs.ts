import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmSearchNFTsParams, TUseEvmSearchNFTsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmSearchNFTs = (params: TUseEvmSearchNFTsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmSearchNFTsReturn>(
    [`/moralis/EvmApi/nft/searchNFTs`, params],
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
