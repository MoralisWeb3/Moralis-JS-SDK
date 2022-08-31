import { SWRConfiguration } from 'swr/dist/types';
import { TResolveDomainParams, TResolveDomainReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmDomain = (params: TResolveDomainParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TResolveDomainReturn['result']>(
    [`/moralis/EvmApi/resolve/resolveDomain`, params],
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
