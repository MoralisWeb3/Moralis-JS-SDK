import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTMetadataOperation as operation, 
  GetNFTMetadataRequest, 
  GetNFTMetadataResponse 
} from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmNFTMetadata = (request: GetNFTMetadataRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTMetadataResponse>(
    ['evmApi/getNFTMetadata', {operation, request}], 
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
