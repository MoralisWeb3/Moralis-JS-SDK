import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmTokenTransfersParams, TUseEvmTokenTransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmTokenTransfers = (params: TUseEvmTokenTransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmTokenTransfersReturn>(
    [`/moralis/EvmApi/_token/getTokenTransfers`, params],
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
