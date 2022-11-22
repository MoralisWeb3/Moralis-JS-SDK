import { fetcher } from '../../../../utils/fetcher';
import { 
  searchNFTsOperation as operation, 
  SearchNFTsRequest, 
  SearchNFTsResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmSearchNFTs = (request: SearchNFTsRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<SearchNFTsResponse>(
    ['evmApi/searchNFTs', {operation, request}], 
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
