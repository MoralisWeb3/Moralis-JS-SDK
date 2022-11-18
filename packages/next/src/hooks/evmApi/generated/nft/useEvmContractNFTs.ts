import { fetcher } from '../../../../utils/fetcher';
import { 
  getContractNFTsOperation as operation, 
  GetContractNFTsRequest, 
  GetContractNFTsResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmContractNFTs = (request: GetContractNFTsRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetContractNFTsResponse>(
    ['evmApi/getContractNFTs', {operation, request}], 
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
