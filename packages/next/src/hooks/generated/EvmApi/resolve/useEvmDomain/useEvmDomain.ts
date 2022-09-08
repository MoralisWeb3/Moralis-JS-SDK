import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmdomainParams, TUseevmdomainReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmDomain = (params: TUseevmdomainParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmdomainReturn>(
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
