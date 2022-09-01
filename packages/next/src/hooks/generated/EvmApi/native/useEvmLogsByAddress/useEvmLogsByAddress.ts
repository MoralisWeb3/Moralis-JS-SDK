import { SWRConfiguration } from 'swr/dist/types';
import { TGetLogsByAddressParams, TGetLogsByAddressReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmLogsByAddress = (params: TGetLogsByAddressParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetLogsByAddressReturn['result']>(
    [`/moralis/EvmApi/native/getLogsByAddress`, params],
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
