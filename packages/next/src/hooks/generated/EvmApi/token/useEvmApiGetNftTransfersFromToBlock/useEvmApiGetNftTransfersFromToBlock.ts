import { SWRConfiguration } from 'swr/dist/types';
import { TGetNftTransfersFromToBlockParams, TGetNftTransfersFromToBlockReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmApiGetNftTransfersFromToBlock = (params: TGetNftTransfersFromToBlockParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.get(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetNftTransfersFromToBlockReturn['result']>(
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
