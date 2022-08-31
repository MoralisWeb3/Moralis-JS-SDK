import { SWRConfiguration } from 'swr/dist/types';
import { TGetNFTsParams, TGetNFTsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmApiGetNFTs = (params: TGetNFTsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetNFTsReturn['result']>(
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
