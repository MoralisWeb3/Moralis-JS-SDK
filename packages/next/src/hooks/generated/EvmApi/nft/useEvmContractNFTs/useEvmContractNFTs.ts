import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmContractNfTsParams, TUseEvmContractNfTsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmContractNFTs = (params: TUseEvmContractNfTsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmContractNfTsReturn>(
    [`EvmApi/nft/getContractNFTs`, params],
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
