import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNftLowestPriceParams, TUseEvmNftLowestPriceReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTLowestPrice = (params: TUseEvmNftLowestPriceParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNftLowestPriceReturn>(
    [`EvmApi/nft/getNFTLowestPrice`, params],
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
