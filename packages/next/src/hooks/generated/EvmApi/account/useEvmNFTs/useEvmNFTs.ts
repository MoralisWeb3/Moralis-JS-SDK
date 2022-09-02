import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNFTsParams, TUseEvmNFTsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTs = (params: TUseEvmNFTsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNFTsReturn>(
    [`/moralis/EvmApi/account/getNFTs`, params],
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
