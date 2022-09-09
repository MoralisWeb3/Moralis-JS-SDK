import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmWalletTransactionsParams, TUseEvmWalletTransactionsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmWalletTransactions = (params: TUseEvmWalletTransactionsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmWalletTransactionsReturn>(
    [`EvmApi/transaction/getWalletTransactions`, params],
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
