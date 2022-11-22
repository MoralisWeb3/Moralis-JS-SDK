import { fetcher } from '../../../../utils/fetcher';
import { 
  syncNFTContractOperation as operation, 
  SyncNFTContractRequest, 
  SyncNFTContractResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmSyncNFTContract = (request: SyncNFTContractRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<SyncNFTContractResponse>(
    ['evmApi/syncNFTContract', {operation, request}], 
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
