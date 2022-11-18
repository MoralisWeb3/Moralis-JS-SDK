import { fetcher } from '../../../../utils/fetcher';
import { 
  getTokenMetadataOperation as operation, 
  GetTokenMetadataRequest, 
  GetTokenMetadataResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmTokenMetadata = (request: GetTokenMetadataRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetTokenMetadataResponse>(
    ['evmApi/getTokenMetadata', {operation, request}], 
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
