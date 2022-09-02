import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmLogsByAddressParams, TUseEvmLogsByAddressReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmLogsByAddress = (params: TUseEvmLogsByAddressParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmLogsByAddressReturn>(
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
