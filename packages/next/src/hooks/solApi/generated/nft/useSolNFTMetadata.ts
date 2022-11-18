import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTMetadataOperation as operation, 
  GetNFTMetadataRequest, 
  GetNFTMetadataResponse 
} from 'moralis/common-sol-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useSolNFTMetadata = (request: GetNFTMetadataRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTMetadataResponse>(
    ['solApi/getNFTMetadata', {operation, request}], 
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
