import { fetcher } from '../../../../utils/fetcher';
import { 
  uploadFolderOperation as operation, 
  UploadFolderRequest, 
  UploadFolderResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmUploadFolder = (request: UploadFolderRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<UploadFolderResponse>(
    ['evmApi/uploadFolder', {operation, request}], 
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
