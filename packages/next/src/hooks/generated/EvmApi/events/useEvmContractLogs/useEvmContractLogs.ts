import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmContractLogsParams, TUseEvmContractLogsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmContractLogs = (params: TUseEvmContractLogsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmContractLogsReturn>(
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
