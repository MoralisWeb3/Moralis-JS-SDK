import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmContractLogsParams, UseEvmContractLogsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmContractLogs = (params: UseEvmContractLogsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmContractLogsReturn>(
    [`EvmApi/events/getContractLogs`, params],
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
