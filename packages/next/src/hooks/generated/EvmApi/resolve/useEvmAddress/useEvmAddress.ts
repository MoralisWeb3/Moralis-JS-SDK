import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmAddressParams, UseEvmAddressReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmAddress = (params: UseEvmAddressParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmAddressReturn>(
    [`EvmApi/resolve/resolveAddress`, params],
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
