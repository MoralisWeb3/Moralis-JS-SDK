import { fetcher } from '../../../../utils/fetcher';
import { 
  getTokenMetadataOperation as operation, 
  GetTokenMetadataRequest, 
  GetTokenMetadataResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmTokenMetadata = (request: GetTokenMetadataRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetTokenMetadataResponse>(
    ['evmApi/getTokenMetadata', {operation, request}], 
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
