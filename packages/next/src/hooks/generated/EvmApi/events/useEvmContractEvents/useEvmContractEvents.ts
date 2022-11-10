import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmContractEventsParams, UseEvmContractEventsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmContractEvents = (params: UseEvmContractEventsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmContractEventsReturn>(
    [`EvmApi/events/getContractEvents`, params],
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
