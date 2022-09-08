import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmRunContractFunctionParams, TUseEvmRunContractFunctionReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmRunContractFunction = (params: TUseEvmRunContractFunctionParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmRunContractFunctionReturn>(
    [`/moralis/EvmApi/utils/runContractFunction`, params],
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
