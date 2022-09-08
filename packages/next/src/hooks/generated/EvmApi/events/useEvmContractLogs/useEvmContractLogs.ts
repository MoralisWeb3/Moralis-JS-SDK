import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmcontractlogsParams, TUseevmcontractlogsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmContractLogs = (params: TUseevmcontractlogsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmcontractlogsReturn>(
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
