import { fetcher } from '../../../../utils/fetcher';
import { 
  getTokenMetadataBySymbolOperation as operation, 
  GetTokenMetadataBySymbolRequest, 
  GetTokenMetadataBySymbolResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmTokenMetadataBySymbol = (request: GetTokenMetadataBySymbolRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetTokenMetadataBySymbolResponse>(
    ['evmApi/getTokenMetadataBySymbol', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
    fetcher, 
    {revalidateOnFocus: false, ...fetchParams}
  );

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};
