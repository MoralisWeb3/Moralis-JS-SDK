import Moralis from 'moralis';
import { UploadFolderRequest, UploadFolderResponse, uploadFolderOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmUploadFolderParams = Partial<UploadFolderRequest>;
export type UseEvmUploadFolderQueryOptions = QueryOptions<UploadFolderResponse, UseEvmUploadFolderParams>;

export function useEvmUploadFolder({ abi }: UseEvmUploadFolderParams = {}, queryOptions: UseEvmUploadFolderQueryOptions = {}) {
  const resolver = useOperationResolver(uploadFolderOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(abi);
  }, [abi]);

  const queryKey: [string, Partial<UploadFolderRequest>] = useMemo(() => {
    return [
      uploadFolderOperation.id,
      {
        abi
      },
    ];
  }, [abi]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['abi']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}