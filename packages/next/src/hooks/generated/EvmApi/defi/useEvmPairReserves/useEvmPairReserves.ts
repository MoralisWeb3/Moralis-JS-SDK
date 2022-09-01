import { SWRConfiguration } from 'swr/dist/types';
import { TGetPairReservesParams, TGetPairReservesReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmPairReserves = (params: TGetPairReservesParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetPairReservesReturn['result']>(
    [`/moralis/EvmApi/defi/getPairReserves`, params],
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
