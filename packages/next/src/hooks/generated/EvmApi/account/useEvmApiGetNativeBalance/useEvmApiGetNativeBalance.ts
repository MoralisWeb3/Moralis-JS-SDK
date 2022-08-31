import { SWRConfiguration } from 'swr/dist/types';
import { TGetNativeBalanceParams, TGetNativeBalanceReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmApiGetNativeBalance = (params: TGetNativeBalanceParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetNativeBalanceReturn['result']>(
    [`/moralis/EvmApi/account/getNativeBalance`, params],
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
