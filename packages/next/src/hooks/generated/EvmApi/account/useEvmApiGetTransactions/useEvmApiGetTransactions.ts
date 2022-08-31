import { SWRConfiguration } from 'swr/dist/types';
import { TGetTransactionsParams, TGetTransactionsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmApiGetTransactions = (params: TGetTransactionsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetTransactionsReturn['result']>(
    [`/moralis/EvmApi/account/getTransactions`, params],
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
