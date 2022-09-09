import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmWalletNftTransfersParams, TUseEvmWalletNftTransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmWalletNFTTransfers = (params: TUseEvmWalletNftTransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmWalletNftTransfersReturn>(
    [`EvmApi/nft/getWalletNFTTransfers`, params],
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
