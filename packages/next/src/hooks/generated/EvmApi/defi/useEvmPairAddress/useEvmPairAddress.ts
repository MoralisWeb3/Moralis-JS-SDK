import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmPairAddressParams, UseEvmPairAddressReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmPairAddress = (params: UseEvmPairAddressParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmPairAddressReturn>(
    [`EvmApi/defi/getPairAddress`, params],
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
