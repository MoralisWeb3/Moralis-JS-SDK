import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNFTLowestPriceParams, TUseEvmNFTLowestPriceReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTLowestPrice = (params: TUseEvmNFTLowestPriceParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNFTLowestPriceReturn>(
    [`/moralis/EvmApi/token/getNFTLowestPrice`, params],
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
