import { SWRConfiguration } from 'swr/dist/types';
import { TRunContractFunctionParams, TRunContractFunctionReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmApiRunContractFunction = (params: TRunContractFunctionParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.get(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TRunContractFunctionReturn['result']>(
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
