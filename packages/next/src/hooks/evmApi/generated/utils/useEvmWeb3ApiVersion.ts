import { web3ApiVersionOperation, Web3ApiVersionRequest, Web3ApiVersionResponse } from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmWeb3ApiVersion = (request: Web3ApiVersionRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, web3ApiVersionOperation.serializeRequest(request, Moralis.Core));
    return web3ApiVersionOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<Web3ApiVersionResponse>('evmApi/web3ApiVersion', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};