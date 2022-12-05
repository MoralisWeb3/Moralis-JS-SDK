import { fetcher } from '../../../../utils/fetcher';
import { 
  uploadFolderOperation as operation, 
  UploadFolderRequest, 
  UploadFolderResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmUploadFolder = (request: UploadFolderRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<UploadFolderResponse>(
    ['evmApi/uploadFolder', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
