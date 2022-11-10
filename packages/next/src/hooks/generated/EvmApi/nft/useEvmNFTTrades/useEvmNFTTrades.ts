import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmNftTradesParams, UseEvmNftTradesReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTTrades = (params: UseEvmNftTradesParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmNftTradesReturn>(
    [`EvmApi/nft/getNFTTrades`, params],
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
