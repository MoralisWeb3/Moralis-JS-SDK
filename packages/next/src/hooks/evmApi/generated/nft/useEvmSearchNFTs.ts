import { fetcher } from '../../../../utils/fetcher';
import { 
  searchNFTsOperation as operation, 
  SearchNFTsRequest, 
  SearchNFTsResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmSearchNFTs = (request: SearchNFTsRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<SearchNFTsResponse>(
    ['evmApi/searchNFTs', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
