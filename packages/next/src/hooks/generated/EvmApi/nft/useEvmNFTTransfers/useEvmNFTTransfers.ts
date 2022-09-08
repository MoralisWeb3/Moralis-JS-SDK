import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmnfttransfersParams, TUseevmnfttransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTTransfers = (params: TUseevmnfttransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmnfttransfersReturn>(
    [`EvmApi/nft/getNFTTransfers`, params],
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
