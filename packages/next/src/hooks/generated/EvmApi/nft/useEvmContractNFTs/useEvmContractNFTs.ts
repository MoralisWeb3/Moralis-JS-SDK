import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmContractNFTsParams, TUseEvmContractNFTsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmContractNFTs = (params: TUseEvmContractNFTsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmContractNFTsReturn>(
    [`/moralis/EvmApi/nft/getContractNFTs`, params],
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
