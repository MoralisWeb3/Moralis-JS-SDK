import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNFTTransfersParams, TUseEvmNFTTransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTTransfers = (params: TUseEvmNFTTransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNFTTransfersReturn>(
    [`/moralis/EvmApi/account/getNFTTransfers`, params],
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
