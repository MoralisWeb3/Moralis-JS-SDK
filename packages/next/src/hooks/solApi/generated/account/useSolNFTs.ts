import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTsOperation as operation, 
  GetNFTsRequest, 
  GetNFTsResponse 
} from 'moralis/common-sol-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useSolNFTs = (request: GetNFTsRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTsResponse>(
    ['solApi/getNFTs', {operation, request}], 
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
