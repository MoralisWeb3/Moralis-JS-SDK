import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmWalletNfTsParams, TUseEvmWalletNfTsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmWalletNFTs = (params: TUseEvmWalletNfTsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmWalletNfTsReturn>(
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
