import { fetcher } from '../../../../utils/fetcher';
import { 
  reSyncMetadataOperation as operation, 
  ReSyncMetadataRequest, 
  ReSyncMetadataResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmReSyncMetadata = (request: ReSyncMetadataRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<ReSyncMetadataResponse>(
    ['evmApi/reSyncMetadata', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
