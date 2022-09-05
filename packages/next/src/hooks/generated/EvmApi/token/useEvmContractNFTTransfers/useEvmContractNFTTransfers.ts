import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmContractNFTTransfersParams, TUseEvmContractNFTTransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmContractNFTTransfers = (params: TUseEvmContractNFTTransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmContractNFTTransfersReturn>(
    [`/moralis/EvmApi/token/getContractNFTTransfers`, params],
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
