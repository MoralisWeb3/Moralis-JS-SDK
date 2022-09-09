import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmAddressParams, TUseEvmAddressReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmAddress = (params: TUseEvmAddressParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmAddressReturn>(
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
