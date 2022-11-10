import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmTransactionParams, UseEvmTransactionReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmTransaction = (params: UseEvmTransactionParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmTransactionReturn>(
    [`EvmApi/transaction/getTransaction`, params],
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
