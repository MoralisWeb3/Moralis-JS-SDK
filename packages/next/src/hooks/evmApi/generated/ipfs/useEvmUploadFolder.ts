import { fetcher } from '../../../../utils/fetcher';
import { 
  uploadFolderOperation as operation, 
  UploadFolderRequest, 
  UploadFolderResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmUploadFolder = (request: UploadFolderRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<UploadFolderResponse>(
    ['evmApi/uploadFolder', {operation, request}], 
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
