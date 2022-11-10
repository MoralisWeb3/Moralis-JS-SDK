import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmTokenTransfersParams, UseEvmTokenTransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmTokenTransfers = (params: UseEvmTokenTransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmTokenTransfersReturn>(
    [`EvmApi/token/getTokenTransfers`, params],
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
