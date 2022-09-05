import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNftTransfersFromToBlockParams, TUseEvmNftTransfersFromToBlockReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNftTransfersFromToBlock = (params: TUseEvmNftTransfersFromToBlockParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNftTransfersFromToBlockReturn>(
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
