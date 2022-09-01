import { SWRConfiguration } from 'swr/dist/types';
import { TGetTokenAllowanceParams, TGetTokenAllowanceReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmTokenAllowance = (params: TGetTokenAllowanceParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetTokenAllowanceReturn['result']>(
    [`/moralis/EvmApi/token/getTokenAllowance`, params],
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
