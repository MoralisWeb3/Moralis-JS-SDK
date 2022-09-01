import { SWRConfiguration } from 'swr/dist/types';
import { TGetWalletTokenIdTransfersParams, TGetWalletTokenIdTransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmWalletTokenIdTransfers = (params: TGetWalletTokenIdTransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetWalletTokenIdTransfersReturn['result']>(
    [`/moralis/EvmApi/token/getWalletTokenIdTransfers`, params],
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
