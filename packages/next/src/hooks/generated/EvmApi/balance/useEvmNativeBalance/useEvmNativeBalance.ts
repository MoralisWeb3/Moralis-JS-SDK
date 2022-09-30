import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmNativeBalanceParams, UseEvmNativeBalanceReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNativeBalance = (params: UseEvmNativeBalanceParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmNativeBalanceReturn>(
    [`EvmApi/balance/getNativeBalance`, params],
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
