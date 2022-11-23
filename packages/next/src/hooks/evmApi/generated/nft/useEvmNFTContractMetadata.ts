import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTContractMetadataOperation as operation, 
  GetNFTContractMetadataRequest, 
  GetNFTContractMetadataResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmNFTContractMetadata = (request: GetNFTContractMetadataRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTContractMetadataResponse>(
    ['evmApi/getNFTContractMetadata', {operation, request}], 
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
