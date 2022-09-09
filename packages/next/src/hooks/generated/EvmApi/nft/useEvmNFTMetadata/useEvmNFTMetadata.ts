import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNftMetadataParams, TUseEvmNftMetadataReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTMetadata = (params: TUseEvmNftMetadataParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNftMetadataReturn>(
    [`EvmApi/nft/getNFTMetadata`, params],
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
