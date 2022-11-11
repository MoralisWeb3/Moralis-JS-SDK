import { uploadFolderOperation, UploadFolderRequest } from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmUploadFolder = (request: UploadFolderRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, fetcherParams);
    return uploadFolderOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR(['evmApi/uploadFolder', uploadFolderOperation.serializeRequest(request, Moralis.Core)], axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};