import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmDomainParams, TUseEvmDomainReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmDomain = (params: TUseEvmDomainParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmDomainReturn>(
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
