import { SWRConfiguration } from 'swr/dist/types';
import { TGetContractNFTTransfersParams, TGetContractNFTTransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmContractNFTTransfers = (params: TGetContractNFTTransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetContractNFTTransfersReturn['result']>(
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
