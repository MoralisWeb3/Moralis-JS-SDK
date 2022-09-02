import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNFTTransfersByBlockParams, TUseEvmNFTTransfersByBlockReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTTransfersByBlock = (params: TUseEvmNFTTransfersByBlockParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNFTTransfersByBlockReturn>(
    [`/moralis/EvmApi/native/getNFTTransfersByBlock`, params],
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
