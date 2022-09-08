import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmWalletNFTsParams, TUseEvmWalletNFTsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmWalletNFTs = (params: TUseEvmWalletNFTsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmWalletNFTsReturn>(
    [`/moralis/EvmApi/nft/getWalletNFTs`, params],
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
