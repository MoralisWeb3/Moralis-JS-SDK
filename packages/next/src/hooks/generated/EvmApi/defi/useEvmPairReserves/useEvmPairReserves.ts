import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmPairReservesParams, UseEvmPairReservesReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmPairReserves = (params: UseEvmPairReservesParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmPairReservesReturn>(
    [`EvmApi/defi/getPairReserves`, params],
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
