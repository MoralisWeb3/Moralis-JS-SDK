import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmWalletNftCollectionsParams, TUseEvmWalletNftCollectionsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmWalletNFTCollections = (params: TUseEvmWalletNftCollectionsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmWalletNftCollectionsReturn>(
    [`EvmApi/nft/getWalletNFTCollections`, params],
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
