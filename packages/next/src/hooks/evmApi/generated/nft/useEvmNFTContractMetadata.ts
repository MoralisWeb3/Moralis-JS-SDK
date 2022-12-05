import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTContractMetadataOperation as operation, 
  GetNFTContractMetadataRequest, 
  GetNFTContractMetadataResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmNFTContractMetadata = (request: GetNFTContractMetadataRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetNFTContractMetadataResponse>(
    ['evmApi/getNFTContractMetadata', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
