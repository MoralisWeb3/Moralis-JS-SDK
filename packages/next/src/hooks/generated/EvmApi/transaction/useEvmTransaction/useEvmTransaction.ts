import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmtransactionParams, TUseevmtransactionReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmTransaction = (params: TUseevmtransactionParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmtransactionReturn>(
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
