import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmTokenAllowanceParams, TUseEvmTokenAllowanceReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmTokenAllowance = (params: TUseEvmTokenAllowanceParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmTokenAllowanceReturn>(
    [`EvmApi/token/getTokenAllowance`, params],
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
