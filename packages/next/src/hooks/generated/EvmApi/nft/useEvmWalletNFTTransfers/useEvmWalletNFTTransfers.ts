import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmWalletNftTransfersParams, UseEvmWalletNftTransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmWalletNFTTransfers = (params: UseEvmWalletNftTransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmWalletNftTransfersReturn>(
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
