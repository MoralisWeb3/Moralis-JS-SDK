import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmNftLowestPriceParams, UseEvmNftLowestPriceReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTLowestPrice = (params: UseEvmNftLowestPriceParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmNftLowestPriceReturn>(
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
