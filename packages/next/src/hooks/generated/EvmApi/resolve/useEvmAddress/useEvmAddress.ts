import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmAddressParams, TUseEvmAddressReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmAddress = (params: TUseEvmAddressParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmAddressReturn>(
    [`/moralis/EvmApi/resolve/resolveAddress`, params],
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
