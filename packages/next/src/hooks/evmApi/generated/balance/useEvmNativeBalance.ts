import { getNativeBalanceOperation, GetNativeBalanceRequest, GetNative } from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';
import { fetcher } from '../../../../utils/fetcher';

export const useEvmNativeBalance = (request: GetNativeBalanceRequest, SWRConfig?: SWRConfiguration) => {
  // const axiosFetcher = async (endpoint: string) => {
  //   const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, getNativeBalanceOperation.serializeRequest(request, Moralis.Core));
  //   return getNativeBalanceOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  // };
const endpoint = 'evmApi/getNativeBalance';
  const { data, error, mutate, isValidating } = useSWR(endpoint, fetcher(endpoint, getNativeBalanceOperation, request), SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};