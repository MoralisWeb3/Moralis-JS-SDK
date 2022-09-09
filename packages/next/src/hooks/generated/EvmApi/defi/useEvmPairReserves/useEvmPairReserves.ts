import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmPairReservesParams, TUseEvmPairReservesReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmPairReserves = (params: TUseEvmPairReservesParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmPairReservesReturn>(
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
