import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNativeBalanceParams, TUseEvmNativeBalanceReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNativeBalance = (params: TUseEvmNativeBalanceParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNativeBalanceReturn>(
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
