import { SWRConfiguration } from 'swr/dist/types';
import { TResolveAddressParams, TResolveAddressReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmAddress = (params: TResolveAddressParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TResolveAddressReturn['result']>(
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
