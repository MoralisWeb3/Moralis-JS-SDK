import Moralis from 'moralis';
import { UploadFolderRequest, UploadFolderResponse, uploadFolderOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmUploadFolderParams = UseMoralisQueryParams<UploadFolderResponse, Partial<UploadFolderRequest>>

export function useEvmUploadFolder({ abi, ...queryParams }: UseEvmUploadFolderParams = {}) {
  const resolver = useOperationResolver(uploadFolderOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(abi && abi);
  }, [abi , abi]);

  const queryKey: [string, Partial<UploadFolderRequest>] = useMemo(() => {
    return [
      uploadFolderOperation.id,
      {
        abi
      },
    ];
  }, [abi]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['abi' , 'abi']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}