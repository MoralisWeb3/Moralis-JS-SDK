import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNftTradesParams, TUseEvmNftTradesReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTTrades = (params: TUseEvmNftTradesParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNftTradesReturn>(
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
