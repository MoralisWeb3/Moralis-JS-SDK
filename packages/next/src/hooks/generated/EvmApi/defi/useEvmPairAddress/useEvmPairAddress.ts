import { SWRConfiguration } from 'swr/dist/types';
import { TGetPairAddressParams, TGetPairAddressReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmPairAddress = (params: TGetPairAddressParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetPairAddressReturn['result']>(
    [`/moralis/EvmApi/defi/getPairAddress`, params],
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
