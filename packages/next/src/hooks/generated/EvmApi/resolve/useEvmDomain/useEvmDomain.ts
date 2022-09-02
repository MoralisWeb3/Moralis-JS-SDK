import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmDomainParams, TUseEvmDomainReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmDomain = (params: TUseEvmDomainParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmDomainReturn>(
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
