import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmBlockParams, UseEvmBlockReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmBlock = (params: UseEvmBlockParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmBlockReturn>(
    [`EvmApi/block/getBlock`, params],
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
