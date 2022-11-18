import { fetcher } from '../../../../utils/fetcher';
import { 
  searchNFTsOperation as operation, 
  SearchNFTsRequest, 
  SearchNFTsResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmSearchNFTs = (request: SearchNFTsRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<SearchNFTsResponse>(
    ['evmApi/searchNFTs', {operation, request}], 
    fetcher, 
    {revalidateOnFocus: false, ...SWRConfig}
  );

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};
