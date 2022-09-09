import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmTokenTransfersParams, TUseEvmTokenTransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmTokenTransfers = (params: TUseEvmTokenTransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmTokenTransfersReturn>(
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
