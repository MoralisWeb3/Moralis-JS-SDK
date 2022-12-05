import { fetcher } from '../../../../utils/fetcher';
import { 
  getContractNFTsOperation as operation, 
  GetContractNFTsRequest, 
  GetContractNFTsResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmContractNFTs = (request: GetContractNFTsRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetContractNFTsResponse>(
    ['evmApi/getContractNFTs', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
