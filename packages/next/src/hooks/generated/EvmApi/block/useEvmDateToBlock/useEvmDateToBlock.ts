import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmdatetoblockParams, TUseevmdatetoblockReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmDateToBlock = (params: TUseevmdatetoblockParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmdatetoblockReturn>(
    [`EvmApi/block/getDateToBlock`, params],
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
