import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNftTransfersFromToBlockParams, TUseEvmNftTransfersFromToBlockReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTTransfersFromToBlock = (params: TUseEvmNftTransfersFromToBlockParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNftTransfersFromToBlockReturn>(
    [`EvmApi/nft/getNFTTransfersFromToBlock`, params],
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
