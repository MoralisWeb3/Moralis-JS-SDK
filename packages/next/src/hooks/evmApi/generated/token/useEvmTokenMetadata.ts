import { fetcher } from '../../../../utils/fetcher';
import { 
  getTokenMetadataOperation as operation, 
  GetTokenMetadataRequest, 
  GetTokenMetadataResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmTokenMetadata = (request: GetTokenMetadataRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetTokenMetadataResponse>(
    ['evmApi/getTokenMetadata', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
