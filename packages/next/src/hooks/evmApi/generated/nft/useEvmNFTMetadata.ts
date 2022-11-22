import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTMetadataOperation as operation, 
  GetNFTMetadataRequest, 
  GetNFTMetadataResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmNFTMetadata = (request: GetNFTMetadataRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTMetadataResponse>(
    ['evmApi/getNFTMetadata', {operation, request}], 
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
