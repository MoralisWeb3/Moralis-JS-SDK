import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmnfttransfersbyblockParams, TUseevmnfttransfersbyblockReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTTransfersByBlock = (params: TUseevmnfttransfersbyblockParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmnfttransfersbyblockReturn>(
    [`EvmApi/nft/getNFTTransfersByBlock`, params],
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
