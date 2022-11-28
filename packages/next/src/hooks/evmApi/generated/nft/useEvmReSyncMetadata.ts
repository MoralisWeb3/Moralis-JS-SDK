import { fetcher } from '../../../../utils/fetcher';
import { 
  reSyncMetadataOperation as operation, 
  ReSyncMetadataRequest, 
  ReSyncMetadataResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmReSyncMetadata = (request: ReSyncMetadataRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<ReSyncMetadataResponse>(
    ['evmApi/reSyncMetadata', {operation, request}], 
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
