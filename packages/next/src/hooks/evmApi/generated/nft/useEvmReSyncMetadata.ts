import { fetcher } from '../../../../utils/fetcher';
import { 
  reSyncMetadataOperation as operation, 
  ReSyncMetadataRequest, 
  ReSyncMetadataResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmReSyncMetadata = (request: ReSyncMetadataRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<ReSyncMetadataResponse>(
    ['evmApi/reSyncMetadata', {operation, request}], 
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
