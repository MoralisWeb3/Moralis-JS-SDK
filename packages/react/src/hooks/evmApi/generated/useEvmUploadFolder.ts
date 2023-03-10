import Moralis from 'moralis';
import { UploadFolderRequest, UploadFolderResponse, uploadFolderOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseEvmUploadFolderParams = UseMoralisQueryParams<UploadFolderResponse, UploadFolderRequest>

export function useEvmUploadFolder({ abi, ...queryParams }: UseEvmUploadFolderParams = {}) {
  const resolver = useOperationResolver(uploadFolderOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, UploadFolderRequest] | undefined = useMemo(() => {
    if (abi) {
      return [
      uploadFolderOperation.id,
      {
        abi
      },
    ];
    }
      return;
  }, [abi]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const response = await resolver.fetch(request);
      return response.result;
    },
    ...queryParams,
    enabled: queryKey && queryParams.enabled,
  });
}