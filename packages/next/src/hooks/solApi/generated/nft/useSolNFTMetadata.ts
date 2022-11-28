import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTMetadataOperation as operation, 
  GetNFTMetadataRequest, 
  GetNFTMetadataResponse 
} from 'moralis/common-sol-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useSolNFTMetadata = (request: GetNFTMetadataRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTMetadataResponse>(
    ['solApi/getNFTMetadata', {operation, request}], 
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
