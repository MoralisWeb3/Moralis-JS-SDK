import { SWRConfiguration } from 'swr/dist/types';
import { TSyncNFTContractParams, TSyncNFTContractReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmApiSyncNFTContract = (params: TSyncNFTContractParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.get(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TSyncNFTContractReturn['result']>(
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
