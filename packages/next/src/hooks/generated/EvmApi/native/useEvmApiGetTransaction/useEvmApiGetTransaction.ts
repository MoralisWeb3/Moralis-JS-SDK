import { SWRConfiguration } from 'swr/dist/types';
import { TGetTransactionParams, TGetTransactionReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmApiGetTransaction = (params: TGetTransactionParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetTransactionReturn['result']>(
    [`/moralis/EvmApi/native/getTransaction`, params],
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
