import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmwalletnftcollectionsParams, TUseevmwalletnftcollectionsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmWalletNFTCollections = (params: TUseevmwalletnftcollectionsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmwalletnftcollectionsReturn>(
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
