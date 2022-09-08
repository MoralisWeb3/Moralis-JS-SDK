import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmnftcontractmetadataParams, TUseevmnftcontractmetadataReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTContractMetadata = (params: TUseevmnftcontractmetadataParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmnftcontractmetadataReturn>(
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
