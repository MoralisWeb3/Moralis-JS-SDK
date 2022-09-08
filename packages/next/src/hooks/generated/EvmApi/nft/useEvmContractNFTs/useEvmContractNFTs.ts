import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmcontractnftsParams, TUseevmcontractnftsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmContractNFTs = (params: TUseevmcontractnftsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmcontractnftsReturn>(
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
