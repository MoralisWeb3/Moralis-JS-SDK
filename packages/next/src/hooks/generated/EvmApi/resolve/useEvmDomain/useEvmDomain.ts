import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmDomainParams, UseEvmDomainReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmDomain = (params: UseEvmDomainParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmDomainReturn>(
    [`EvmApi/resolve/resolveDomain`, params],
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
