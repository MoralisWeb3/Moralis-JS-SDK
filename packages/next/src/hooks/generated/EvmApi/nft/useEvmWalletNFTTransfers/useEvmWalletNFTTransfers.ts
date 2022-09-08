import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmWalletNFTTransfersParams, TUseEvmWalletNFTTransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmWalletNFTTransfers = (params: TUseEvmWalletNFTTransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmWalletNFTTransfersReturn>(
    [`/moralis/EvmApi/nft/getWalletNFTTransfers`, params],
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
