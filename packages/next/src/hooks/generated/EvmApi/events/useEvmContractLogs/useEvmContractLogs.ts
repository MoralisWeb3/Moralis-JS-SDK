import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmContractLogsParams, TUseEvmContractLogsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmContractLogs = (params: TUseEvmContractLogsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmContractLogsReturn>(
    [`/moralis/EvmApi/events/getContractLogs`, params],
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
