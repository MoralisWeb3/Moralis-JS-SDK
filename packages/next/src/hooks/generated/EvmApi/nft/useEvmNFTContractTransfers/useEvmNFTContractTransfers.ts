import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNFTContractTransfersParams, TUseEvmNFTContractTransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTContractTransfers = (params: TUseEvmNFTContractTransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNFTContractTransfersReturn>(
    [`/moralis/EvmApi/nft/getNFTContractTransfers`, params],
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
