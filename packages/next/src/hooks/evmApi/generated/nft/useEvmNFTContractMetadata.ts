import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTContractMetadataOperation as operation, 
  GetNFTContractMetadataRequest, 
  GetNFTContractMetadataResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmNFTContractMetadata = (request: GetNFTContractMetadataRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTContractMetadataResponse>(
    ['evmApi/getNFTContractMetadata', {operation, request}], 
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
