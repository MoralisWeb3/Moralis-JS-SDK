import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTsOperation as operation, 
  GetNFTsRequest, 
  GetNFTsResponse 
} from 'moralis/common-sol-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useSolNFTs = (request: GetNFTsRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTsResponse>(
    ['solApi/getNFTs', {operation, request}], 
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
