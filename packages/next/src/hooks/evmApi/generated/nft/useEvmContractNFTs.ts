import { fetcher } from '../../../../utils/fetcher';
import { 
  getContractNFTsOperation as operation, 
  GetContractNFTsRequest, 
  GetContractNFTsResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmContractNFTs = (request: GetContractNFTsRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetContractNFTsResponse>(
    ['evmApi/getContractNFTs', {operation, request}], 
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
