import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmTokenAddressTransfersParams, TUseEvmTokenAddressTransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmTokenAddressTransfers = (params: TUseEvmTokenAddressTransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmTokenAddressTransfersReturn>(
    [`/moralis/EvmApi/token/getTokenAddressTransfers`, params],
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
