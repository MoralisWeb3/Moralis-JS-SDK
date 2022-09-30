import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmWalletTokenTransfersParams, UseEvmWalletTokenTransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmWalletTokenTransfers = (params: UseEvmWalletTokenTransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmWalletTokenTransfersReturn>(
    [`EvmApi/token/getWalletTokenTransfers`, params],
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
