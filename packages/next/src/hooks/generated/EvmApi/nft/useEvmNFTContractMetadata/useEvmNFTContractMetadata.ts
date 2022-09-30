import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmNftContractMetadataParams, UseEvmNftContractMetadataReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTContractMetadata = (params: UseEvmNftContractMetadataParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmNftContractMetadataReturn>(
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
