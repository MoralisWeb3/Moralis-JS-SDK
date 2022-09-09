import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmDateToBlockParams, TUseEvmDateToBlockReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmDateToBlock = (params: TUseEvmDateToBlockParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmDateToBlockReturn>(
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
