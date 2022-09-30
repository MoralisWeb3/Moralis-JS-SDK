import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmNftContractTransfersParams, UseEvmNftContractTransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTContractTransfers = (params: UseEvmNftContractTransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmNftContractTransfersReturn>(
    [`EvmApi/nft/getNFTContractTransfers`, params],
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
