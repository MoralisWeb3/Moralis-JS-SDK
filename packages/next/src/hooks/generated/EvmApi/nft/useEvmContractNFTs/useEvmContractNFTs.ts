import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmContractNfTsParams, UseEvmContractNfTsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmContractNFTs = (params: UseEvmContractNfTsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmContractNfTsReturn>(
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
