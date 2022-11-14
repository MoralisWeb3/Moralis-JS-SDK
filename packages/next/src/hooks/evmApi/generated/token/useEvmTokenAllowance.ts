import { getTokenAllowanceOperation, GetTokenAllowanceRequest, GetTokenAllowanceResponse } from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmTokenAllowance = (request: GetTokenAllowanceRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, getTokenAllowanceOperation.serializeRequest(request, Moralis.Core));
    return getTokenAllowanceOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<GetTokenAllowanceResponse>('evmApi/getTokenAllowance', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};