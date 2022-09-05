import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNFTTradesParams, TUseEvmNFTTradesReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTTrades = (params: TUseEvmNFTTradesParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNFTTradesReturn>(
    [`/moralis/EvmApi/token/getNFTTrades`, params],
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
