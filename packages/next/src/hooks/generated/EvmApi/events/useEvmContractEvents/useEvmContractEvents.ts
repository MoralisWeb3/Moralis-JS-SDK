import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmContractEventsParams, TUseEvmContractEventsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmContractEvents = (params: TUseEvmContractEventsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmContractEventsReturn>(
    [`/moralis/EvmApi/events/getContractEvents`, params],
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
