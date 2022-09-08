import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmwallettransactionsParams, TUseevmwallettransactionsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmWalletTransactions = (params: TUseevmwallettransactionsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmwallettransactionsReturn>(
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
