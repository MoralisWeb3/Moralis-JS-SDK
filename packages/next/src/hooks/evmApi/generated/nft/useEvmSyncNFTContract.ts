import { fetcher } from '../../../../utils/fetcher';
import { 
  syncNFTContractOperation as operation, 
  SyncNFTContractRequest, 
  SyncNFTContractResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmSyncNFTContract = (request: SyncNFTContractRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<SyncNFTContractResponse>(
    ['evmApi/syncNFTContract', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
