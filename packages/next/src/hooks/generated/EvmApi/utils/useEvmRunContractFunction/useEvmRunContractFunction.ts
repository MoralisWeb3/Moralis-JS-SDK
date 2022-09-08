import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmruncontractfunctionParams, TUseevmruncontractfunctionReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmRunContractFunction = (params: TUseevmruncontractfunctionParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmruncontractfunctionReturn>(
    [`EvmApi/utils/runContractFunction`, params],
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
