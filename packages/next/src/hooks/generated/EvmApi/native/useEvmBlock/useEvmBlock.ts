import { SWRConfiguration } from 'swr/dist/types';
import { TGetBlockParams, TGetBlockReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmBlock = (params: TGetBlockParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetBlockReturn['result']>(
    [`/moralis/EvmApi/native/getBlock`, params],
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
