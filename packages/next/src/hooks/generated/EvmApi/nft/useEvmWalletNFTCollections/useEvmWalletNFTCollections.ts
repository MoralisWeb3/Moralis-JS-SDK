import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmWalletNFTCollectionsParams, TUseEvmWalletNFTCollectionsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmWalletNFTCollections = (params: TUseEvmWalletNFTCollectionsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmWalletNFTCollectionsReturn>(
    [`/moralis/EvmApi/nft/getWalletNFTCollections`, params],
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
