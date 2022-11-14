import { getTokenMetadataBySymbolOperation, GetTokenMetadataBySymbolRequest, GetTokenMetadataBySymbolResponse } from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmTokenMetadataBySymbol = (request: GetTokenMetadataBySymbolRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, getTokenMetadataBySymbolOperation.serializeRequest(request, Moralis.Core));
    return getTokenMetadataBySymbolOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<GetTokenMetadataBySymbolResponse>('evmApi/getTokenMetadataBySymbol', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};