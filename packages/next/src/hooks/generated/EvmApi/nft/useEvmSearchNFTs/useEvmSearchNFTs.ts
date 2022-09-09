import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmSearchNfTsParams, TUseEvmSearchNfTsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmSearchNFTs = (params: TUseEvmSearchNfTsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmSearchNfTsReturn>(
    [`EvmApi/nft/searchNFTs`, params],
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
