import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmTransactionParams, TUseEvmTransactionReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmTransaction = (params: TUseEvmTransactionParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmTransactionReturn>(
    [`/moralis/EvmApi/transaction/getTransaction`, params],
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
