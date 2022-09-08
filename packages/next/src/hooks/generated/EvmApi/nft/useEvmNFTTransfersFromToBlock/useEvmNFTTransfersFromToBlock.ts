import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNFTTransfersFromToBlockParams, TUseEvmNFTTransfersFromToBlockReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTTransfersFromToBlock = (params: TUseEvmNFTTransfersFromToBlockParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNFTTransfersFromToBlockReturn>(
    [`/moralis/EvmApi/nft/getNFTTransfersFromToBlock`, params],
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
