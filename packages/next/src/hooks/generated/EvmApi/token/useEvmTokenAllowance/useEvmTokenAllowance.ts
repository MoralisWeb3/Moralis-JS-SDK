import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmtokenallowanceParams, TUseevmtokenallowanceReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmTokenAllowance = (params: TUseevmtokenallowanceParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmtokenallowanceReturn>(
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
