import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmWalletNfTsParams, UseEvmWalletNfTsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmWalletNFTs = (params: UseEvmWalletNfTsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmWalletNfTsReturn>(
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
