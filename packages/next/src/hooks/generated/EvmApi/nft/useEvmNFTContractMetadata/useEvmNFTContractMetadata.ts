import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNftContractMetadataParams, TUseEvmNftContractMetadataReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTContractMetadata = (params: TUseEvmNftContractMetadataParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNftContractMetadataReturn>(
    [`EvmApi/nft/getNFTContractMetadata`, params],
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
