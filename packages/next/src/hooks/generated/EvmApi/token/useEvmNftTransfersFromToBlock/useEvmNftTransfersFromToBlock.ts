import { SWRConfiguration } from 'swr/dist/types';
import { TGetNftTransfersFromToBlockParams, TGetNftTransfersFromToBlockReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNftTransfersFromToBlock = (params: TGetNftTransfersFromToBlockParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetNftTransfersFromToBlockReturn['result']>(
    [`/moralis/EvmApi/token/getNftTransfersFromToBlock`, params],
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
