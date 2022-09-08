import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmwalletnftsParams, TUseevmwalletnftsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmWalletNFTs = (params: TUseevmwalletnftsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmwalletnftsReturn>(
    [`EvmApi/nft/getWalletNFTs`, params],
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
