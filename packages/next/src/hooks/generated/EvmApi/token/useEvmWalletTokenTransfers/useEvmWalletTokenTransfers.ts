import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmWalletTokenTransfersParams, TUseEvmWalletTokenTransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmWalletTokenTransfers = (params: TUseEvmWalletTokenTransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmWalletTokenTransfersReturn>(
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
